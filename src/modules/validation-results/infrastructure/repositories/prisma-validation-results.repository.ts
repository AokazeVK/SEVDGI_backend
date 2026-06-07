import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';
import {
  ValidationResultDetailEntity,
  ValidationResultEntity,
} from '../../domain/entities/validation-result.entity';
import { ValidationResultsRepository } from '../../domain/repositories/validation-results.repository';

@Injectable()
export class PrismaValidationResultsRepository implements ValidationResultsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ValidationResultEntity[]> {
    const items = await this.prisma.validationResult.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: this.includeRelations(),
    });

    return items.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<ValidationResultEntity | null> {
    const item = await this.prisma.validationResult.findUnique({
      where: { id },
      include: this.includeRelations(),
    });

    return item ? this.toEntity(item) : null;
  }

  async findByProcess(processId: string): Promise<ValidationResultEntity[]> {
    const items = await this.prisma.validationResult.findMany({
      where: { processId },
      orderBy: {
        createdAt: 'desc',
      },
      include: this.includeRelations(),
    });

    return items.map((item) => this.toEntity(item));
  }

  private includeRelations() {
    return {
      details: {
        include: {
          rule: true,
        },
      },
    };
  }

  private toEntity(item: any): ValidationResultEntity {
    return new ValidationResultEntity(
      item.id,
      item.processId,
      item.status,
      item.summary,
      item.createdAt,
      item.details?.map(
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
    );
  }
}
