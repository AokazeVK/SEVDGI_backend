import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';
import {
  PharmacyDispensationDetailEntity,
  PharmacyDispensationEntity,
} from '../../domain/entities/pharmacy-dispensation.entity';
import {
  CreatePharmacyDispensationData,
  PharmacyDispensationsRepository,
} from '../../domain/repositories/pharmacy-dispensations.repository';

@Injectable()
export class PrismaPharmacyDispensationsRepository implements PharmacyDispensationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PharmacyDispensationEntity[]> {
    const dispensations = await this.prisma.pharmacyDispensation.findMany({
      orderBy: {
        dispensedAt: 'desc',
      },
      include: {
        pharmacy: true,
        patient: true,
        prescription: true,
        details: {
          include: {
            medicine: true,
            batch: true,
          },
        },
      },
    });

    return dispensations.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<PharmacyDispensationEntity | null> {
    const dispensation = await this.prisma.pharmacyDispensation.findUnique({
      where: { id },
      include: {
        pharmacy: true,
        patient: true,
        prescription: true,
        details: {
          include: {
            medicine: true,
            batch: true,
          },
        },
      },
    });

    return dispensation ? this.toEntity(dispensation) : null;
  }

  async create(data: CreatePharmacyDispensationData): Promise<PharmacyDispensationEntity> {
    const dispensation = await this.prisma.$transaction(async (tx) => {
      const pharmacy = await tx.pharmacy.findUnique({
        where: { id: data.pharmacyId },
      });

      if (!pharmacy) {
        throw new NotFoundException('Farmacia no encontrada');
      }

      const prescription = await tx.prescription.findUnique({
        where: { id: data.prescriptionId },
        include: {
          details: true,
        },
      });

      if (!prescription) {
        throw new NotFoundException('Receta no encontrada');
      }

      if (prescription.patientId !== data.patientId) {
        throw new BadRequestException('La receta no corresponde al paciente enviado');
      }

      if (prescription.status === 'CANCELLED') {
        throw new BadRequestException('No se puede dispensar una receta cancelada');
      }

      if (prescription.status === 'DISPENSED') {
        throw new BadRequestException('La receta ya fue dispensada completamente');
      }

      if (!prescription.details || prescription.details.length === 0) {
        throw new BadRequestException('La receta no tiene medicamentos');
      }

      const createdDispensation = await tx.pharmacyDispensation.create({
        data: {
          pharmacyId: data.pharmacyId,
          patientId: data.patientId,
          prescriptionId: data.prescriptionId,
        },
      });

      let allItemsFullyDispensed = true;
      let atLeastOneItemDispensed = false;

      for (const detail of prescription.details) {
        let remainingQuantity = detail.quantity;

        const availableInventory = await tx.pharmacyInventory.findMany({
          where: {
            pharmacyId: data.pharmacyId,
            medicineId: detail.medicineId,
            stock: {
              gt: 0,
            },
            batch: {
              isActive: true,
            },
          },
          include: {
            batch: true,
          },
          orderBy: {
            batch: {
              expirationDate: 'asc',
            },
          },
        });

        const totalAvailable = availableInventory.reduce((sum, item) => sum + item.stock, 0);

        if (totalAvailable < detail.quantity) {
          allItemsFullyDispensed = false;
        }

        for (const inventory of availableInventory) {
          if (remainingQuantity <= 0) break;

          if (!inventory.batchId) {
            throw new BadRequestException('No se puede dispensar inventario sin lote asignado');
          }

          const batchId = inventory.batchId;
          const quantityToDispense = Math.min(inventory.stock, remainingQuantity);

          const updatedInventory = await tx.pharmacyInventory.update({
            where: { id: inventory.id },
            data: {
              stock: {
                decrement: quantityToDispense,
              },
            },
          });

          await tx.pharmacyDispensationDetail.create({
            data: {
              dispensationId: createdDispensation.id,
              medicineId: detail.medicineId,
              batchId,
              quantity: quantityToDispense,
            },
          });

          await tx.stockMovement.create({
            data: {
              medicineId: detail.medicineId,
              batchId,
              pharmacyId: data.pharmacyId,
              type: 'PHARMACY_DISPENSATION',
              quantity: quantityToDispense,
              referenceId: createdDispensation.id,
              observation: 'Dispensación de medicamento a paciente',
            },
          });

          await tx.kardex.create({
            data: {
              medicineId: detail.medicineId,
              batchId,
              pharmacyId: data.pharmacyId,
              movementType: 'PHARMACY_DISPENSATION',
              quantityIn: 0,
              quantityOut: quantityToDispense,
              balance: updatedInventory.stock,
              referenceId: createdDispensation.id,
            },
          });

          remainingQuantity -= quantityToDispense;
          atLeastOneItemDispensed = true;
        }
      }

      if (!atLeastOneItemDispensed) {
        throw new BadRequestException('No existe stock disponible para dispensar esta receta');
      }

      await tx.prescription.update({
        where: { id: data.prescriptionId },
        data: {
          status: allItemsFullyDispensed ? 'DISPENSED' : 'PARTIALLY_DISPENSED',
        },
      });

      return tx.pharmacyDispensation.findUnique({
        where: { id: createdDispensation.id },
        include: {
          pharmacy: true,
          patient: true,
          prescription: true,
          details: {
            include: {
              medicine: true,
              batch: true,
            },
          },
        },
      });
    });

    return this.toEntity(dispensation);
  }

  private toEntity(item: any): PharmacyDispensationEntity {
    return new PharmacyDispensationEntity(
      item.id,
      item.pharmacyId,
      item.patientId,
      item.prescriptionId,
      item.dispensedAt,
      item.pharmacy?.name ?? null,
      item.patient?.fullName ?? null,
      item.prescription?.prescriptionNumber ?? null,
      item.details?.map(
        (detail: any) =>
          new PharmacyDispensationDetailEntity(
            detail.id,
            detail.medicineId,
            detail.medicine?.name ?? null,
            detail.batchId,
            detail.batch?.batchNumber ?? null,
            detail.quantity,
          ),
      ) ?? [],
    );
  }
}
