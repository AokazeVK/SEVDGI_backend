import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { TherapeuticGroupEntity } from '../../domain/entities/therapeutic-group.entity';
import {
  CreateTherapeuticGroupData,
  TherapeuticGroupsRepository,
  UpdateTherapeuticGroupData,
} from '../../domain/repositories/therapeutic-groups.repository';

@Injectable()
export class PrismaTherapeuticGroupsRepository implements TherapeuticGroupsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<TherapeuticGroupEntity[]> {
    const items = await this.prisma.therapeuticGroup.findMany({
      orderBy: { name: 'asc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<TherapeuticGroupEntity | null> {
    const item = await this.prisma.therapeuticGroup.findUnique({
      where: { id },
    });

    return item ? this.toEntity(item) : null;
  }

  async findByName(name: string): Promise<TherapeuticGroupEntity | null> {
    const item = await this.prisma.therapeuticGroup.findUnique({
      where: { name },
    });

    return item ? this.toEntity(item) : null;
  }

  async create(data: CreateTherapeuticGroupData): Promise<TherapeuticGroupEntity> {
    const item = await this.prisma.therapeuticGroup.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });

    return this.toEntity(item);
  }

  async update(id: string, data: UpdateTherapeuticGroupData): Promise<TherapeuticGroupEntity> {
    const item = await this.prisma.therapeuticGroup.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
      },
    });

    return this.toEntity(item);
  }

  async toggle(id: string): Promise<TherapeuticGroupEntity> {
    const current = await this.prisma.therapeuticGroup.findUnique({
      where: { id },
      select: { isActive: true },
    });

    const item = await this.prisma.therapeuticGroup.update({
      where: { id },
      data: {
        isActive: !current?.isActive,
      },
    });

    return this.toEntity(item);
  }

  private toEntity(item: any): TherapeuticGroupEntity {
    return new TherapeuticGroupEntity(item.id, item.name, item.description, item.isActive);
  }
}
