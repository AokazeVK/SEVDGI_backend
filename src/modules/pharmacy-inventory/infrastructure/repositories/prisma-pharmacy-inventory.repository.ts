import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';
import { PharmacyInventoryEntity } from '../../domain/entities/pharmacy-inventory.entity';
import { PharmacyInventoryRepository } from '../../domain/repositories/pharmacy-inventory.repository';

@Injectable()
export class PrismaPharmacyInventoryRepository implements PharmacyInventoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PharmacyInventoryEntity[]> {
    const items = await this.prisma.pharmacyInventory.findMany({
      include: {
        pharmacy: true,
        medicine: true,
        batch: true,
      },
      orderBy: [
        {
          medicine: {
            name: 'asc',
          },
        },
        {
          batch: {
            expirationDate: 'asc',
          },
        },
      ],
    });

    return items.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<PharmacyInventoryEntity | null> {
    const item = await this.prisma.pharmacyInventory.findUnique({
      where: { id },
      include: {
        pharmacy: true,
        medicine: true,
        batch: true,
      },
    });

    return item ? this.toEntity(item) : null;
  }

  async findByPharmacy(pharmacyId: string): Promise<PharmacyInventoryEntity[]> {
    const items = await this.prisma.pharmacyInventory.findMany({
      where: { pharmacyId },
      include: {
        pharmacy: true,
        medicine: true,
        batch: true,
      },
      orderBy: [
        {
          medicine: {
            name: 'asc',
          },
        },
        {
          batch: {
            expirationDate: 'asc',
          },
        },
      ],
    });

    return items.map((item) => this.toEntity(item));
  }

  async findByMedicine(medicineId: string): Promise<PharmacyInventoryEntity[]> {
    const items = await this.prisma.pharmacyInventory.findMany({
      where: { medicineId },
      include: {
        pharmacy: true,
        medicine: true,
        batch: true,
      },
      orderBy: [
        {
          pharmacy: {
            name: 'asc',
          },
        },
        {
          batch: {
            expirationDate: 'asc',
          },
        },
      ],
    });

    return items.map((item) => this.toEntity(item));
  }

  async findAvailableByMedicineFefo(
    pharmacyId: string,
    medicineId: string,
  ): Promise<PharmacyInventoryEntity[]> {
    const items = await this.prisma.pharmacyInventory.findMany({
      where: {
        pharmacyId,
        medicineId,
        stock: {
          gt: 0,
        },
        batch: {
          isActive: true,
        },
      },
      include: {
        pharmacy: true,
        medicine: true,
        batch: true,
      },
      orderBy: {
        batch: {
          expirationDate: 'asc',
        },
      },
    });

    return items.map((item) => this.toEntity(item));
  }

  private toEntity(item: any): PharmacyInventoryEntity {
    return new PharmacyInventoryEntity(
      item.id,
      item.pharmacyId,
      item.medicineId,
      item.batchId,
      item.stock,
      item.minimumStock,
      item.pharmacy?.name ?? null,
      item.medicine?.name ?? null,
      item.batch?.batchNumber ?? null,
      item.batch?.expirationDate ?? null,
    );
  }
}
