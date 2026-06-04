import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';
import { DocumentFileEntity } from '../../domain/entities/document-file.entity';
import {
  CreateDocumentFileData,
  DocumentFilesRepository,
} from '../../domain/repositories/document-files.repository';

@Injectable()
export class PrismaDocumentFilesRepository implements DocumentFilesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<DocumentFileEntity[]> {
    const items = await this.prisma.documentFile.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<DocumentFileEntity | null> {
    const item = await this.prisma.documentFile.findUnique({
      where: { id },
    });

    return item ? this.toEntity(item) : null;
  }

  async findByDocument(documentId: string): Promise<DocumentFileEntity[]> {
    const items = await this.prisma.documentFile.findMany({
      where: { documentId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return items.map((item) => this.toEntity(item));
  }

  async create(data: CreateDocumentFileData): Promise<DocumentFileEntity> {
    const item = await this.prisma.documentFile.create({
      data: {
        documentId: data.documentId,
        filePath: data.filePath,
        fileName: data.fileName,
        mimeType: data.mimeType,
        size: data.size,
      },
    });

    return this.toEntity(item);
  }

  private toEntity(item: any): DocumentFileEntity {
    return new DocumentFileEntity(
      item.id,
      item.documentId,
      item.filePath,
      item.fileName,
      item.mimeType,
      item.size,
      item.createdAt,
    );
  }
}
