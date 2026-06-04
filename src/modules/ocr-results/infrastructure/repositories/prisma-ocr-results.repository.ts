import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';
import { OcrResultEntity } from '../../domain/entities/ocr-result.entity';
import {
  CreateOcrResultData,
  OcrResultsRepository,
} from '../../domain/repositories/ocr-results.repository';

@Injectable()
export class PrismaOcrResultsRepository implements OcrResultsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<OcrResultEntity[]> {
    const items = await this.prisma.ocrResult.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<OcrResultEntity | null> {
    const item = await this.prisma.ocrResult.findUnique({
      where: { id },
    });

    return item ? this.toEntity(item) : null;
  }

  async findByDocument(documentId: string): Promise<OcrResultEntity[]> {
    const items = await this.prisma.ocrResult.findMany({
      where: { documentId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return items.map((item) => this.toEntity(item));
  }

  async create(data: CreateOcrResultData): Promise<OcrResultEntity> {
    const item = await this.prisma.ocrResult.create({
      data: {
        documentId: data.documentId,
        rawText: data.rawText,
        confidence: data.confidence,
      },
    });

    await this.prisma.document.update({
      where: {
        id: data.documentId,
      },
      data: {
        status: 'OCR_PROCESSED',
      },
    });

    return this.toEntity(item);
  }

  private toEntity(item: any): OcrResultEntity {
    return new OcrResultEntity(
      item.id,
      item.documentId,
      item.rawText,
      item.confidence,
      item.createdAt,
    );
  }
}
