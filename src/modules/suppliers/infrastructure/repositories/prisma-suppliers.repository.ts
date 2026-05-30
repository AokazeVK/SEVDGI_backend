import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { SupplierEntity } from '../../domain/entities/supplier.entity';
import {
  CreateSupplierData,
  SuppliersRepository,
  UpdateSupplierData,
} from '../../domain/repositories/suppliers.repository';

@Injectable()
export class PrismaSuppliersRepository implements SuppliersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<SupplierEntity[]> {
    const suppliers = await this.prisma.supplier.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return suppliers.map((supplier) => this.toEntity(supplier));
  }

  async findById(id: string): Promise<SupplierEntity | null> {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
    });

    return supplier ? this.toEntity(supplier) : null;
  }

  async findByNit(nit: string): Promise<SupplierEntity | null> {
    const supplier = await this.prisma.supplier.findUnique({
      where: { nit },
    });

    return supplier ? this.toEntity(supplier) : null;
  }

  async create(data: CreateSupplierData): Promise<SupplierEntity> {
    const supplier = await this.prisma.supplier.create({
      data: {
        nit: data.nit,
        name: data.name,
        phone: data.phone,
        address: data.address,
      },
    });

    return this.toEntity(supplier);
  }

  async update(id: string, data: UpdateSupplierData): Promise<SupplierEntity> {
    const supplier = await this.prisma.supplier.update({
      where: { id },
      data: {
        nit: data.nit,
        name: data.name,
        phone: data.phone,
        address: data.address,
      },
    });

    return this.toEntity(supplier);
  }

  async toggle(id: string): Promise<SupplierEntity> {
    const current = await this.prisma.supplier.findUnique({
      where: { id },
      select: { isActive: true },
    });

    const supplier = await this.prisma.supplier.update({
      where: { id },
      data: {
        isActive: !current?.isActive,
      },
    });

    return this.toEntity(supplier);
  }

  private toEntity(supplier: any): SupplierEntity {
    return new SupplierEntity(
      supplier.id,
      supplier.nit,
      supplier.name,
      supplier.phone,
      supplier.address,
      supplier.isActive,
    );
  }
}
