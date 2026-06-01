import { Injectable } from '@nestjs/common';
import { EntryStatus } from '@prisma/client';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import {
  WarehouseEntryDetailEntity,
  WarehouseEntryEntity,
} from '../../domain/entities/warehouse-entry.entity';
import {
  CreateWarehouseEntryData,
  UpdateWarehouseEntryData,
  WarehouseEntriesRepository,
} from '../../domain/repositories/warehouse-entries.repository';

@Injectable()
export class PrismaWarehouseEntriesRepository implements WarehouseEntriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<WarehouseEntryEntity[]> {
    const entries = await this.prisma.warehouseEntry.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        details: true,
      },
    });

    return entries.map((entry) => this.toEntity(entry));
  }

  async findById(id: string): Promise<WarehouseEntryEntity | null> {
    const entry = await this.prisma.warehouseEntry.findUnique({
      where: { id },
      include: {
        details: true,
      },
    });

    return entry ? this.toEntity(entry) : null;
  }

  async findByEntryNumber(entryNumber: string): Promise<WarehouseEntryEntity | null> {
    const entry = await this.prisma.warehouseEntry.findUnique({
      where: { entryNumber },
      include: {
        details: true,
      },
    });

    return entry ? this.toEntity(entry) : null;
  }

  async create(data: CreateWarehouseEntryData): Promise<WarehouseEntryEntity> {
    const entry = await this.prisma.$transaction(async (tx) => {
      const createdEntry = await tx.warehouseEntry.create({
        data: {
          supplierId: data.supplierId,
          warehouseId: data.warehouseId,
          entryNumber: data.entryNumber,
          invoiceNumber: data.invoiceNumber,
          entryDate: data.entryDate ?? new Date(),
          status: EntryStatus.REGISTERED,
          details: {
            create: data.details.map((detail) => ({
              medicineId: detail.medicineId,
              batchId: detail.batchId,
              quantity: detail.quantity,
              unitCost: detail.unitCost,
            })),
          },
        },
        include: {
          details: true,
        },
      });

      for (const detail of data.details) {
        await tx.warehouseInventory.upsert({
          where: {
            warehouseId_medicineId_batchId: {
              warehouseId: data.warehouseId,
              medicineId: detail.medicineId,
              batchId: detail.batchId,
            },
          },
          update: {
            stock: {
              increment: detail.quantity,
            },
          },
          create: {
            warehouseId: data.warehouseId,
            medicineId: detail.medicineId,
            batchId: detail.batchId,
            stock: detail.quantity,
            minimumStock: 0,
          },
        });

        await tx.stockMovement.create({
          data: {
            warehouseId: data.warehouseId,
            medicineId: detail.medicineId,
            batchId: detail.batchId,
            type: 'WAREHOUSE_ENTRY',
            quantity: detail.quantity,
            referenceId: createdEntry.id,
            observation: `Ingreso de almacén ${createdEntry.entryNumber ?? createdEntry.id}`,
          },
        });

        const lastKardex = await tx.kardex.findFirst({
          where: {
            warehouseId: data.warehouseId,
            medicineId: detail.medicineId,
            batchId: detail.batchId,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });

        const previousBalance = lastKardex?.balance ?? 0;

        await tx.kardex.create({
          data: {
            warehouseId: data.warehouseId,
            medicineId: detail.medicineId,
            batchId: detail.batchId,
            movementType: 'WAREHOUSE_ENTRY',
            quantityIn: detail.quantity,
            quantityOut: 0,
            balance: previousBalance + detail.quantity,
            referenceId: createdEntry.id,
          },
        });
      }

      return createdEntry;
    });

    return this.toEntity(entry);
  }

  async update(id: string, data: UpdateWarehouseEntryData): Promise<WarehouseEntryEntity> {
    const entry = await this.prisma.warehouseEntry.update({
      where: { id },
      data: {
        supplierId: data.supplierId,
        entryNumber: data.entryNumber,
        invoiceNumber: data.invoiceNumber,
        entryDate: data.entryDate,
      },
      include: {
        details: true,
      },
    });

    return this.toEntity(entry);
  }

  private toEntity(entry: any): WarehouseEntryEntity {
    return new WarehouseEntryEntity(
      entry.id,
      entry.supplierId,
      entry.warehouseId,
      entry.entryNumber,
      entry.invoiceNumber,
      entry.entryDate,
      entry.status,
      entry.details?.map(
        (detail: any) =>
          new WarehouseEntryDetailEntity(
            detail.id,
            detail.medicineId,
            detail.batchId,
            detail.quantity,
            detail.unitCost?.toString() ?? null,
          ),
      ) ?? [],
    );
  }
}
