import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { ManufacturerEntity } from '../../domain/entities/manufacturer.entity';
import {
  CreateManufacturerData,
  ManufacturersRepository,
  UpdateManufacturerData,
} from '../../domain/repositories/manufacturers.repository';

@Injectable()
export class PrismaManufacturersRepository implements ManufacturersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ManufacturerEntity[]> {
    const manufacturers = await this.prisma.manufacturer.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return manufacturers.map((manufacturer) => this.toEntity(manufacturer));
  }

  async findById(id: string): Promise<ManufacturerEntity | null> {
    const manufacturer = await this.prisma.manufacturer.findUnique({
      where: { id },
    });

    return manufacturer ? this.toEntity(manufacturer) : null;
  }

  async findByName(name: string): Promise<ManufacturerEntity | null> {
    const manufacturer = await this.prisma.manufacturer.findFirst({
      where: { name },
    });

    return manufacturer ? this.toEntity(manufacturer) : null;
  }

  async create(data: CreateManufacturerData): Promise<ManufacturerEntity> {
    const manufacturer = await this.prisma.manufacturer.create({
      data: {
        name: data.name,
        country: data.country,
      },
    });

    return this.toEntity(manufacturer);
  }

  async update(
    id: string,
    data: UpdateManufacturerData,
  ): Promise<ManufacturerEntity> {
    const manufacturer = await this.prisma.manufacturer.update({
      where: { id },
      data: {
        name: data.name,
        country: data.country,
      },
    });

    return this.toEntity(manufacturer);
  }

  async toggle(id: string): Promise<ManufacturerEntity> {
    const current = await this.prisma.manufacturer.findUnique({
      where: { id },
      select: { isActive: true },
    });

    const manufacturer = await this.prisma.manufacturer.update({
      where: { id },
      data: {
        isActive: !current?.isActive,
      },
    });

    return this.toEntity(manufacturer);
  }

  private toEntity(manufacturer: any): ManufacturerEntity {
    return new ManufacturerEntity(
      manufacturer.id,
      manufacturer.name,
      manufacturer.country,
      manufacturer.isActive,
    );
  }
}