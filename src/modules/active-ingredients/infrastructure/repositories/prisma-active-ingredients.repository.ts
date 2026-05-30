import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { ActiveIngredientEntity } from '../../domain/entities/active-ingredient.entity';
import {
  ActiveIngredientsRepository,
  CreateActiveIngredientData,
  UpdateActiveIngredientData,
} from '../../domain/repositories/active-ingredients.repository';

@Injectable()
export class PrismaActiveIngredientsRepository implements ActiveIngredientsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ActiveIngredientEntity[]> {
    const items = await this.prisma.activeIngredient.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<ActiveIngredientEntity | null> {
    const item = await this.prisma.activeIngredient.findUnique({
      where: { id },
    });

    return item ? this.toEntity(item) : null;
  }

  async findByName(name: string): Promise<ActiveIngredientEntity | null> {
    const item = await this.prisma.activeIngredient.findUnique({
      where: { name },
    });

    return item ? this.toEntity(item) : null;
  }

  async create(data: CreateActiveIngredientData): Promise<ActiveIngredientEntity> {
    const item = await this.prisma.activeIngredient.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });

    return this.toEntity(item);
  }

  async update(id: string, data: UpdateActiveIngredientData): Promise<ActiveIngredientEntity> {
    const item = await this.prisma.activeIngredient.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
      },
    });

    return this.toEntity(item);
  }

  async toggle(id: string): Promise<ActiveIngredientEntity> {
    const current = await this.prisma.activeIngredient.findUnique({
      where: { id },
      select: { isActive: true },
    });

    const item = await this.prisma.activeIngredient.update({
      where: { id },
      data: {
        isActive: !current?.isActive,
      },
    });

    return this.toEntity(item);
  }

  private toEntity(item: any): ActiveIngredientEntity {
    return new ActiveIngredientEntity(item.id, item.name, item.description, item.isActive);
  }
}
