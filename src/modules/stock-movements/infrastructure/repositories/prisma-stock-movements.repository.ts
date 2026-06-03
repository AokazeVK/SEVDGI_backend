import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';
import { StockMovementEntity } from '../../domain/entities/stock-movement.entity';
import { StockMovementsRepository } from '../../domain/repositories/stock-movements.repository';

@Injectable()
export class PrismaStockMovementsRepository implements StockMovementsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<StockMovementEntity[]> {
    const items = await this.prisma.stockMovement.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<StockMovementEntity | null> {
    const item = await this.prisma.stockMovement.findUnique({
      where: { id },
    });

    return item ? this.toEntity(item) : null;
  }

  async findByMedicine(medicineId: string): Promise<StockMovementEntity[]> {
    const items = await this.prisma.stockMovement.findMany({
      where: { medicineId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findByBatch(batchId: string): Promise<StockMovementEntity[]> {
    const items = await this.prisma.stockMovement.findMany({
      where: { batchId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findByWarehouse(warehouseId: string): Promise<StockMovementEntity[]> {
    const items = await this.prisma.stockMovement.findMany({
      where: { warehouseId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findByPharmacy(pharmacyId: string): Promise<StockMovementEntity[]> {
    const items = await this.prisma.stockMovement.findMany({
      where: { pharmacyId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return items.map((item) => this.toEntity(item));
  }

  private toEntity(item: any): StockMovementEntity {
    return new StockMovementEntity(
      item.id,
      item.medicineId,
      item.batchId,
      item.type,
      item.quantity,
      item.warehouseId,
      item.pharmacyId,
      item.referenceId,
      item.observation,
      item.createdAt,
    );
  }
}
