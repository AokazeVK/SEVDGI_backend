import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { LaboratoryEntity } from '../../domain/entities/laboratory.entity';
import {
  CreateLaboratoryData,
  LaboratoriesRepository,
  UpdateLaboratoryData,
} from '../../domain/repositories/laboratories.repository';

@Injectable()
export class PrismaLaboratoriesRepository implements LaboratoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<LaboratoryEntity[]> {
    const laboratories = await this.prisma.laboratory.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return laboratories.map((laboratory) => this.toEntity(laboratory));
  }

  async findById(id: string): Promise<LaboratoryEntity | null> {
    const laboratory = await this.prisma.laboratory.findUnique({
      where: { id },
    });

    return laboratory ? this.toEntity(laboratory) : null;
  }

  async findByNit(nit: string): Promise<LaboratoryEntity | null> {
    const laboratory = await this.prisma.laboratory.findUnique({
      where: { nit },
    });

    return laboratory ? this.toEntity(laboratory) : null;
  }

  async create(data: CreateLaboratoryData): Promise<LaboratoryEntity> {
    const laboratory = await this.prisma.laboratory.create({
      data: {
        nit: data.nit,
        name: data.name,
        country: data.country,
      },
    });

    return this.toEntity(laboratory);
  }

  async update(
    id: string,
    data: UpdateLaboratoryData,
  ): Promise<LaboratoryEntity> {
    const laboratory = await this.prisma.laboratory.update({
      where: { id },
      data: {
        nit: data.nit,
        name: data.name,
        country: data.country,
      },
    });

    return this.toEntity(laboratory);
  }

  async toggle(id: string): Promise<LaboratoryEntity> {
    const current = await this.prisma.laboratory.findUnique({
      where: { id },
      select: { isActive: true },
    });

    const laboratory = await this.prisma.laboratory.update({
      where: { id },
      data: {
        isActive: !current?.isActive,
      },
    });

    return this.toEntity(laboratory);
  }

  private toEntity(laboratory: any): LaboratoryEntity {
    return new LaboratoryEntity(
      laboratory.id,
      laboratory.nit,
      laboratory.name,
      laboratory.country,
      laboratory.isActive,
    );
  }
}