import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { MedicineBatchEntity } from '../../domain/entities/medicine-batch.entity';
import {
  CreateMedicineBatchData,
  MedicineBatchesRepository,
  UpdateMedicineBatchData,
} from '../../domain/repositories/medicine-batches.repository';

@Injectable()
export class PrismaMedicineBatchesRepository implements MedicineBatchesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<MedicineBatchEntity[]> {
    const batches = await this.prisma.medicineBatch.findMany({
      orderBy: {
        expirationDate: 'asc',
      },
    });

    return batches.map((batch) => this.toEntity(batch));
  }

  async findById(id: string): Promise<MedicineBatchEntity | null> {
    const batch = await this.prisma.medicineBatch.findUnique({
      where: { id },
    });

    return batch ? this.toEntity(batch) : null;
  }

  async findByMedicineAndBatchNumber(
    medicineId: string,
    batchNumber: string,
  ): Promise<MedicineBatchEntity | null> {
    const batch = await this.prisma.medicineBatch.findUnique({
      where: {
        medicineId_batchNumber: {
          medicineId,
          batchNumber,
        },
      },
    });

    return batch ? this.toEntity(batch) : null;
  }

  async create(data: CreateMedicineBatchData): Promise<MedicineBatchEntity> {
    const batch = await this.prisma.medicineBatch.create({
      data: {
        medicineId: data.medicineId,
        batchNumber: data.batchNumber,
        expirationDate: data.expirationDate,
      },
    });

    return this.toEntity(batch);
  }

  async update(id: string, data: UpdateMedicineBatchData): Promise<MedicineBatchEntity> {
    const batch = await this.prisma.medicineBatch.update({
      where: { id },
      data: {
        batchNumber: data.batchNumber,
        expirationDate: data.expirationDate,
      },
    });

    return this.toEntity(batch);
  }

  async toggle(id: string): Promise<MedicineBatchEntity> {
    const current = await this.prisma.medicineBatch.findUnique({
      where: { id },
      select: { isActive: true },
    });

    const batch = await this.prisma.medicineBatch.update({
      where: { id },
      data: {
        isActive: !current?.isActive,
      },
    });

    return this.toEntity(batch);
  }

  private toEntity(batch: any): MedicineBatchEntity {
    return new MedicineBatchEntity(
      batch.id,
      batch.medicineId,
      batch.batchNumber,
      batch.expirationDate,
      batch.isActive,
    );
  }
}
