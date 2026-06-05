import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';
import {
  ValidationProcessEntity,
  ValidationResultDetailEntity,
  ValidationResultEntity,
} from '../../domain/entities/validation-process.entity';
import {
  CreateValidationProcessData,
  UpdateValidationProcessStatusData,
  ValidationProcessesRepository,
} from '../../domain/repositories/validation-processes.repository';

@Injectable()
export class PrismaValidationProcessesRepository implements ValidationProcessesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ValidationProcessEntity[]> {
    const items = await this.prisma.validationProcess.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: this.includeRelations(),
    });

    return items.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<ValidationProcessEntity | null> {
    const item = await this.prisma.validationProcess.findUnique({
      where: { id },
      include: this.includeRelations(),
    });

    return item ? this.toEntity(item) : null;
  }

  async findByDocument(documentId: string): Promise<ValidationProcessEntity[]> {
    const items = await this.prisma.validationProcess.findMany({
      where: { documentId },
      orderBy: {
        createdAt: 'desc',
      },
      include: this.includeRelations(),
    });

    return items.map((item) => this.toEntity(item));
  }

  async findByWarehouseEntry(warehouseEntryId: string): Promise<ValidationProcessEntity[]> {
    const items = await this.prisma.validationProcess.findMany({
      where: { warehouseEntryId },
      orderBy: {
        createdAt: 'desc',
      },
      include: this.includeRelations(),
    });

    return items.map((item) => this.toEntity(item));
  }

  async create(data: CreateValidationProcessData): Promise<ValidationProcessEntity> {
    const item = await this.prisma.validationProcess.create({
      data: {
        documentId: data.documentId,
        warehouseEntryId: data.warehouseEntryId,
      },
      include: this.includeRelations(),
    });

    return this.toEntity(item);
  }

  async updateStatus(
    id: string,
    data: UpdateValidationProcessStatusData,
  ): Promise<ValidationProcessEntity> {
    const item = await this.prisma.validationProcess.update({
      where: { id },
      data: {
        status: data.status,
      },
      include: this.includeRelations(),
    });

    return this.toEntity(item);
  }

  private includeRelations() {
    return {
      results: {
        include: {
          details: {
            include: {
              rule: true,
            },
          },
        },
      },
    };
  }

  private toEntity(item: any): ValidationProcessEntity {
    return new ValidationProcessEntity(
      item.id,
      item.documentId,
      item.warehouseEntryId,
      item.status,
      item.createdAt,
      item.results?.map(
        (result: any) =>
          new ValidationResultEntity(
            result.id,
            result.processId,
            result.status,
            result.summary,
            result.createdAt,
            result.details?.map(
              (detail: any) =>
                new ValidationResultDetailEntity(
                  detail.id,
                  detail.validationResultId,
                  detail.ruleId,
                  detail.status,
                  detail.message,
                  detail.rule?.code ?? null,
                  detail.rule?.name ?? null,
                ),
            ) ?? [],
          ),
      ) ?? [],
    );
  }
}
