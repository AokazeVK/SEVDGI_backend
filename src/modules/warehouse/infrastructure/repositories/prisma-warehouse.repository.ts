import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { WarehouseEntity } from '../../domain/entities/warehouse.entity';
import {
  CreateWarehouseData,
  UpdateWarehouseData,
  WarehouseRepository,
} from '../../domain/repositories/warehouse.repository';

@Injectable()
export class PrismaWarehouseRepository implements WarehouseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<WarehouseEntity[]> {
    const warehouses = await this.prisma.warehouse.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return warehouses.map((warehouse) => this.toEntity(warehouse));
  }

  async findById(id: string): Promise<WarehouseEntity | null> {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id },
    });

    return warehouse ? this.toEntity(warehouse) : null;
  }

  async findByName(name: string): Promise<WarehouseEntity | null> {
    const warehouse = await this.prisma.warehouse.findFirst({
      where: { name },
    });

    return warehouse ? this.toEntity(warehouse) : null;
  }

  async create(data: CreateWarehouseData): Promise<WarehouseEntity> {
    const warehouse = await this.prisma.warehouse.create({
      data: {
        name: data.name,
        description: data.description,
        location: data.location,
      },
    });

    return this.toEntity(warehouse);
  }

  async update(id: string, data: UpdateWarehouseData): Promise<WarehouseEntity> {
    const warehouse = await this.prisma.warehouse.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        location: data.location,
      },
    });

    return this.toEntity(warehouse);
  }

  async toggle(id: string): Promise<WarehouseEntity> {
    const current = await this.prisma.warehouse.findUnique({
      where: { id },
      select: { isActive: true },
    });

    const warehouse = await this.prisma.warehouse.update({
      where: { id },
      data: {
        isActive: !current?.isActive,
      },
    });

    return this.toEntity(warehouse);
  }

  private toEntity(warehouse: any): WarehouseEntity {
    return new WarehouseEntity(
      warehouse.id,
      warehouse.name,
      warehouse.description,
      warehouse.location,
      warehouse.isActive,
    );
  }
}
