import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';
import { OcrExtractedFieldEntity } from '../../domain/entities/ocr-extracted-field.entity';
import {
  CreateOcrExtractedFieldData,
  OcrExtractedFieldsRepository,
} from '../../domain/repositories/ocr-extracted-fields.repository';

@Injectable()
export class PrismaOcrExtractedFieldsRepository implements OcrExtractedFieldsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<OcrExtractedFieldEntity[]> {
    const items = await this.prisma.ocrExtractedField.findMany();

    return items.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<OcrExtractedFieldEntity | null> {
    const item = await this.prisma.ocrExtractedField.findUnique({
      where: { id },
    });

    return item ? this.toEntity(item) : null;
  }

  async findByOcrResult(ocrResultId: string): Promise<OcrExtractedFieldEntity[]> {
    const items = await this.prisma.ocrExtractedField.findMany({
      where: { ocrResultId },
    });

    return items.map((item) => this.toEntity(item));
  }

  async create(data: CreateOcrExtractedFieldData): Promise<OcrExtractedFieldEntity> {
    const item = await this.prisma.ocrExtractedField.create({
      data: {
        ocrResultId: data.ocrResultId,
        fieldName: data.fieldName.trim().toUpperCase(),
        value: data.value,
        confidence: data.confidence,
      },
    });

    return this.toEntity(item);
  }

  private toEntity(item: any): OcrExtractedFieldEntity {
    return new OcrExtractedFieldEntity(
      item.id,
      item.ocrResultId,
      item.fieldName,
      item.value,
      item.confidence,
    );
  }
}
