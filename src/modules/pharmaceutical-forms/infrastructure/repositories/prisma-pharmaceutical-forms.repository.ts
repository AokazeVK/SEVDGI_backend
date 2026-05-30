import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';

import { PharmaceuticalFormEntity } from '../../domain/entities/pharmaceutical-form.entity';

import {
  CreatePharmaceuticalFormData,
  PharmaceuticalFormsRepository,
  UpdatePharmaceuticalFormData,
} from '../../domain/repositories/pharmaceutical-forms.repository';

@Injectable()
export class PrismaPharmaceuticalFormsRepository implements PharmaceuticalFormsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PharmaceuticalFormEntity[]> {
    const items = await this.prisma.pharmaceuticalForm.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<PharmaceuticalFormEntity | null> {
    const item = await this.prisma.pharmaceuticalForm.findUnique({
      where: { id },
    });

    return item ? this.toEntity(item) : null;
  }

  async findByName(name: string): Promise<PharmaceuticalFormEntity | null> {
    const item = await this.prisma.pharmaceuticalForm.findUnique({
      where: { name },
    });

    return item ? this.toEntity(item) : null;
  }

  async create(data: CreatePharmaceuticalFormData): Promise<PharmaceuticalFormEntity> {
    const item = await this.prisma.pharmaceuticalForm.create({
      data,
    });

    return this.toEntity(item);
  }

  async update(id: string, data: UpdatePharmaceuticalFormData): Promise<PharmaceuticalFormEntity> {
    const item = await this.prisma.pharmaceuticalForm.update({
      where: { id },
      data,
    });

    return this.toEntity(item);
  }

  async toggle(id: string): Promise<PharmaceuticalFormEntity> {
    const current = await this.prisma.pharmaceuticalForm.findUnique({
      where: { id },
      select: {
        isActive: true,
      },
    });

    const item = await this.prisma.pharmaceuticalForm.update({
      where: { id },
      data: {
        isActive: !current?.isActive,
      },
    });

    return this.toEntity(item);
  }

  private toEntity(item: any): PharmaceuticalFormEntity {
    return new PharmaceuticalFormEntity(item.id, item.name, item.isActive);
  }
}
