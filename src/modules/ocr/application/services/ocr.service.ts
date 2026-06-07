import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';
import { OcrProcessResultEntity } from '../../domain/entities/ocr-process-result.entity';
import type { OcrProvider } from '../../domain/providers/ocr-provider';
import { OCR_PROVIDER } from '../../domain/providers/ocr-provider';

@Injectable()
export class OcrService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(OCR_PROVIDER)
    private readonly ocrProvider: OcrProvider,
  ) {}

  async processDocument(documentId: string): Promise<OcrProcessResultEntity> {
    const document = await this.prisma.document.findUnique({
      where: { id: documentId },
      include: {
        files: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });

    if (!document) {
      throw new NotFoundException('Documento no encontrado');
    }

    const file = document.files[0];

    if (!file) {
      throw new NotFoundException('El documento no tiene archivo asociado');
    }

    const normalizedPath = file.filePath.startsWith('uploads/')
      ? `../${file.filePath}`
      : file.filePath;

    const result = await this.ocrProvider.processFile(normalizedPath);
    const ocrResult = await this.prisma.$transaction(async (tx) => {
      const created = await tx.ocrResult.create({
        data: {
          documentId,
          rawText: result.rawText,
          confidence: result.confidence,
        },
      });

      await tx.document.update({
        where: { id: documentId },
        data: {
          status: 'OCR_PROCESSED',
        },
      });

      return created;
    });

    return new OcrProcessResultEntity(
      documentId,
      file.id,
      ocrResult.id,
      ocrResult.rawText,
      ocrResult.confidence,
    );
  }
}
