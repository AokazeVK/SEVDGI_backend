import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';
import {
  PharmacyReceptionDetailEntity,
  PharmacyReceptionEntity,
} from '../../domain/entities/pharmacy-reception.entity';
import {
  CreatePharmacyReceptionData,
  PharmacyReceptionsRepository,
} from '../../domain/repositories/pharmacy-receptions.repository';

@Injectable()
export class PrismaPharmacyReceptionsRepository implements PharmacyReceptionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PharmacyReceptionEntity[]> {
    const receptions = await this.prisma.pharmacyReception.findMany({
      orderBy: {
        receivedAt: 'desc',
      },
      include: {
        pharmacy: true,
        details: {
          include: {
            medicine: true,
            batch: true,
          },
        },
      },
    });

    return receptions.map((reception) => this.toEntity(reception));
  }

  async findById(id: string): Promise<PharmacyReceptionEntity | null> {
    const reception = await this.prisma.pharmacyReception.findUnique({
      where: { id },
      include: {
        pharmacy: true,
        details: {
          include: {
            medicine: true,
            batch: true,
          },
        },
      },
    });

    return reception ? this.toEntity(reception) : null;
  }

  async create(data: CreatePharmacyReceptionData): Promise<PharmacyReceptionEntity> {
    const reception = await this.prisma.$transaction(async (tx) => {
      const pharmacy = await tx.pharmacy.findUnique({
        where: { id: data.pharmacyId },
      });

      if (!pharmacy) {
        throw new NotFoundException('Farmacia no encontrada');
      }

      const dispatch = await tx.dispatch.findUnique({
        where: { id: data.dispatchId },
        include: {
          details: true,
        },
      });

      if (!dispatch) {
        throw new NotFoundException('Despacho no encontrado');
      }

      if (dispatch.status !== 'SENT') {
        throw new BadRequestException('Solo se pueden recibir despachos enviados');
      }

      if (!dispatch.details || dispatch.details.length === 0) {
        throw new BadRequestException('El despacho no tiene detalles');
      }

      const createdReception = await tx.pharmacyReception.create({
        data: {
          pharmacyId: data.pharmacyId,
          dispatchId: data.dispatchId,
          details: {
            create: dispatch.details.map((detail) => {
              if (!detail.batchId) {
                throw new BadRequestException('No se puede recibir un despacho sin lote asignado');
              }

              return {
                medicineId: detail.medicineId,
                batchId: detail.batchId,
                quantity: detail.quantity,
              };
            }),
          },
        },
      });

      for (const detail of dispatch.details) {
        if (!detail.batchId) {
          throw new BadRequestException('No se puede recibir un despacho sin lote asignado');
        }

        const batchId = detail.batchId;

        const updatedInventory = await tx.pharmacyInventory.upsert({
          where: {
            pharmacyId_medicineId_batchId: {
              pharmacyId: data.pharmacyId,
              medicineId: detail.medicineId,
              batchId,
            },
          },
          update: {
            stock: {
              increment: detail.quantity,
            },
          },
          create: {
            pharmacyId: data.pharmacyId,
            medicineId: detail.medicineId,
            batchId,
            stock: detail.quantity,
            minimumStock: 0,
          },
        });

        await tx.stockMovement.create({
          data: {
            medicineId: detail.medicineId,
            batchId,
            pharmacyId: data.pharmacyId,
            type: 'PHARMACY_RECEPTION',
            quantity: detail.quantity,
            referenceId: createdReception.id,
            observation: 'Recepción de despacho en farmacia',
          },
        });

        await tx.kardex.create({
          data: {
            medicineId: detail.medicineId,
            batchId,
            pharmacyId: data.pharmacyId,
            movementType: 'PHARMACY_RECEPTION',
            quantityIn: detail.quantity,
            quantityOut: 0,
            balance: updatedInventory.stock,
            referenceId: createdReception.id,
          },
        });
      }

      await tx.dispatch.update({
        where: { id: data.dispatchId },
        data: {
          status: 'RECEIVED',
        },
      });

      return tx.pharmacyReception.findUnique({
        where: { id: createdReception.id },
        include: {
          pharmacy: true,
          details: {
            include: {
              medicine: true,
              batch: true,
            },
          },
        },
      });
    });

    return this.toEntity(reception);
  }

  private toEntity(reception: any): PharmacyReceptionEntity {
    return new PharmacyReceptionEntity(
      reception.id,
      reception.pharmacyId,
      reception.dispatchId,
      reception.receivedAt,
      reception.pharmacy?.name ?? null,
      reception.details?.map(
        (detail: any) =>
          new PharmacyReceptionDetailEntity(
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
