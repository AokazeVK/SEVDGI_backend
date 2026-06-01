import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';
import { PharmacyEntity } from '../../domain/entities/pharmacy.entity';
import {
  CreatePharmacyData,
  PharmacyRepository,
  UpdatePharmacyData,
} from '../../domain/repositories/pharmacy.repository';

@Injectable()
export class PrismaPharmacyRepository implements PharmacyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PharmacyEntity[]> {
    const pharmacies = await this.prisma.pharmacy.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return pharmacies.map((pharmacy) => this.toEntity(pharmacy));
  }

  async findById(id: string): Promise<PharmacyEntity | null> {
    const pharmacy = await this.prisma.pharmacy.findUnique({
      where: { id },
    });

    return pharmacy ? this.toEntity(pharmacy) : null;
  }

  async findByName(name: string): Promise<PharmacyEntity | null> {
    const pharmacy = await this.prisma.pharmacy.findFirst({
      where: { name },
    });

    return pharmacy ? this.toEntity(pharmacy) : null;
  }

  async create(data: CreatePharmacyData): Promise<PharmacyEntity> {
    const pharmacy = await this.prisma.pharmacy.create({
      data: {
        name: data.name,
        location: data.location,
      },
    });

    return this.toEntity(pharmacy);
  }

  async update(id: string, data: UpdatePharmacyData): Promise<PharmacyEntity> {
    const pharmacy = await this.prisma.pharmacy.update({
      where: { id },
      data: {
        name: data.name,
        location: data.location,
      },
    });

    return this.toEntity(pharmacy);
  }

  async toggle(id: string): Promise<PharmacyEntity> {
    const current = await this.prisma.pharmacy.findUnique({
      where: { id },
      select: { isActive: true },
    });

    const pharmacy = await this.prisma.pharmacy.update({
      where: { id },
      data: {
        isActive: !current?.isActive,
      },
    });

    return this.toEntity(pharmacy);
  }

  private toEntity(pharmacy: any): PharmacyEntity {
    return new PharmacyEntity(pharmacy.id, pharmacy.name, pharmacy.location, pharmacy.isActive);
  }
}
