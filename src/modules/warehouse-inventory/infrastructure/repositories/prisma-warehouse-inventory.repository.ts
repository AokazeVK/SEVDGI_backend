import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';

import { WarehouseInventoryEntity } from '../../domain/entities/warehouse-inventory.entity';
import { WarehouseInventoryRepository } from '../../domain/repositories/warehouse-inventory.repository';

@Injectable()
export class PrismaWarehouseInventoryRepository implements WarehouseInventoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<WarehouseInventoryEntity[]> {
    const items = await this.prisma.warehouseInventory.findMany({
      include: {
        warehouse: true,
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

  async findById(id: string): Promise<WarehouseInventoryEntity | null> {
    const item = await this.prisma.warehouseInventory.findUnique({
      where: { id },
      include: {
        warehouse: true,
        medicine: true,
        batch: true,
      },
    });

    return item ? this.toEntity(item) : null;
  }

  async findAvailableByMedicineFefo(
    warehouseId: string,
    medicineId: string,
  ): Promise<WarehouseInventoryEntity[]> {
    const items = await this.prisma.warehouseInventory.findMany({
      where: {
        warehouseId,
        medicineId,
        stock: {
          gt: 0,
        },
        batch: {
          isActive: true,
        },
      },
      include: {
        warehouse: true,
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
  async findByWarehouse(warehouseId: string): Promise<WarehouseInventoryEntity[]> {
    const items = await this.prisma.warehouseInventory.findMany({
      where: { warehouseId },
      include: {
        warehouse: true,
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

  async findByMedicine(medicineId: string): Promise<WarehouseInventoryEntity[]> {
    const items = await this.prisma.warehouseInventory.findMany({
      where: { medicineId },
      include: {
        warehouse: true,
        medicine: true,
        batch: true,
      },
      orderBy: [
        {
          warehouse: {
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

  private toEntity(item: any): WarehouseInventoryEntity {
    return new WarehouseInventoryEntity(
      item.id,
      item.warehouseId,
      item.medicineId,
      item.batchId,
      item.stock,
      item.minimumStock,
      item.warehouse?.name ?? null,
      item.medicine?.name ?? null,
      item.batch?.batchNumber ?? null,
      item.batch?.expirationDate ?? null,
    );
  }
}
