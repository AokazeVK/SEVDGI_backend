import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';
import { KardexEntity } from '../../domain/entities/kardex.entity';
import { KardexRepository } from '../../domain/repositories/kardex.repository';

@Injectable()
export class PrismaKardexRepository implements KardexRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<KardexEntity[]> {
    const items = await this.prisma.kardex.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<KardexEntity | null> {
    const item = await this.prisma.kardex.findUnique({
      where: { id },
    });

    return item ? this.toEntity(item) : null;
  }

  async findByMedicine(medicineId: string): Promise<KardexEntity[]> {
    const items = await this.prisma.kardex.findMany({
      where: { medicineId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findByWarehouse(warehouseId: string): Promise<KardexEntity[]> {
    const items = await this.prisma.kardex.findMany({
      where: { warehouseId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findByPharmacy(pharmacyId: string): Promise<KardexEntity[]> {
    const items = await this.prisma.kardex.findMany({
      where: { pharmacyId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return items.map((item) => this.toEntity(item));
  }

  private toEntity(item: any): KardexEntity {
    return new KardexEntity(
      item.id,
      item.medicineId,
      item.batchId,
      item.movementType,
      item.quantityIn,
      item.quantityOut,
      item.balance,
      item.warehouseId,
      item.pharmacyId,
      item.referenceId,
      item.createdAt,
    );
  }
}
