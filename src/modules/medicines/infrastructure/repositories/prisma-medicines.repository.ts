import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { MedicineEntity } from '../../domain/entities/medicine.entity';
import {
  CreateMedicineData,
  MedicinesRepository,
  UpdateMedicineData,
} from '../../domain/repositories/medicines.repository';

@Injectable()
export class PrismaMedicinesRepository implements MedicinesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<MedicineEntity[]> {
    const medicines = await this.prisma.medicine.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        activeIngredients: {
          include: {
            activeIngredient: true,
          },
        },
      },
    });

    return medicines.map((medicine) => this.toEntity(medicine));
  }

  async findById(id: string): Promise<MedicineEntity | null> {
    const medicine = await this.prisma.medicine.findUnique({
      where: { id },
      include: {
        activeIngredients: {
          include: {
            activeIngredient: true,
          },
        },
      },
    });

    return medicine ? this.toEntity(medicine) : null;
  }

  async findByCode(code: string): Promise<MedicineEntity | null> {
    const medicine = await this.prisma.medicine.findUnique({
      where: { code },
      include: {
        activeIngredients: {
          include: {
            activeIngredient: true,
          },
        },
      },
    });

    return medicine ? this.toEntity(medicine) : null;
  }

  async findByName(name: string): Promise<MedicineEntity | null> {
    const medicine = await this.prisma.medicine.findFirst({
      where: { name },
      include: {
        activeIngredients: {
          include: {
            activeIngredient: true,
          },
        },
      },
    });

    return medicine ? this.toEntity(medicine) : null;
  }

  async create(data: CreateMedicineData): Promise<MedicineEntity> {
    const medicine = await this.prisma.medicine.create({
      data: {
        code: data.code,
        name: data.name,
        description: data.description,
        concentration: data.concentration,
        presentation: data.presentation,
        pharmaceuticalFormId: data.pharmaceuticalFormId,
        unitId: data.unitId,
        therapeuticGroupId: data.therapeuticGroupId,
        manufacturerId: data.manufacturerId,
        activeIngredients: data.activeIngredientIds?.length
          ? {
              create: data.activeIngredientIds.map((activeIngredientId) => ({
                activeIngredient: {
                  connect: { id: activeIngredientId },
                },
              })),
            }
          : undefined,
      },
      include: {
        activeIngredients: {
          include: {
            activeIngredient: true,
          },
        },
      },
    });

    return this.toEntity(medicine);
  }

  async update(id: string, data: UpdateMedicineData): Promise<MedicineEntity> {
    const medicine = await this.prisma.$transaction(async (tx) => {
      if (data.activeIngredientIds) {
        await tx.medicineActiveIngredient.deleteMany({
          where: { medicineId: id },
        });

        if (data.activeIngredientIds.length > 0) {
          await tx.medicineActiveIngredient.createMany({
            data: data.activeIngredientIds.map((activeIngredientId) => ({
              medicineId: id,
              activeIngredientId,
            })),
            skipDuplicates: true,
          });
        }
      }

      return tx.medicine.update({
        where: { id },
        data: {
          code: data.code,
          name: data.name,
          description: data.description,
          concentration: data.concentration,
          presentation: data.presentation,
          pharmaceuticalFormId: data.pharmaceuticalFormId,
          unitId: data.unitId,
          therapeuticGroupId: data.therapeuticGroupId,
          manufacturerId: data.manufacturerId,
        },
        include: {
          activeIngredients: {
            include: {
              activeIngredient: true,
            },
          },
        },
      });
    });

    return this.toEntity(medicine);
  }

  async toggle(id: string): Promise<MedicineEntity> {
    const current = await this.prisma.medicine.findUnique({
      where: { id },
      select: { isActive: true },
    });

    const medicine = await this.prisma.medicine.update({
      where: { id },
      data: {
        isActive: !current?.isActive,
      },
      include: {
        activeIngredients: {
          include: {
            activeIngredient: true,
          },
        },
      },
    });

    return this.toEntity(medicine);
  }

  private toEntity(medicine: any): MedicineEntity {
    return new MedicineEntity(
      medicine.id,
      medicine.code,
      medicine.name,
      medicine.description,
      medicine.concentration,
      medicine.presentation,
      medicine.pharmaceuticalFormId,
      medicine.unitId,
      medicine.therapeuticGroupId,
      medicine.manufacturerId,
      medicine.activeIngredients?.map((item: any) => item.activeIngredient.name) ?? [],
      medicine.isActive,
    );
  }
}
