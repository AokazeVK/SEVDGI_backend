import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';
import { DocumentEntity } from '../../domain/entities/document.entity';
import {
  CreateDocumentData,
  DocumentsRepository,
  UpdateDocumentData,
} from '../../domain/repositories/documents.repository';

@Injectable()
export class PrismaDocumentsRepository implements DocumentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<DocumentEntity[]> {
    const documents = await this.prisma.document.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        documentType: true,
      },
    });

    return documents.map((document) => this.toEntity(document));
  }

  async findById(id: string): Promise<DocumentEntity | null> {
    const document = await this.prisma.document.findUnique({
      where: { id },
      include: {
        documentType: true,
      },
    });

    return document ? this.toEntity(document) : null;
  }

  async findByWarehouseEntry(warehouseEntryId: string): Promise<DocumentEntity[]> {
    const documents = await this.prisma.document.findMany({
      where: { warehouseEntryId },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        documentType: true,
      },
    });

    return documents.map((document) => this.toEntity(document));
  }

  async findByPrescription(prescriptionId: string): Promise<DocumentEntity[]> {
    const documents = await this.prisma.document.findMany({
      where: { prescriptionId },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        documentType: true,
      },
    });

    return documents.map((document) => this.toEntity(document));
  }

  async create(data: CreateDocumentData): Promise<DocumentEntity> {
    const document = await this.prisma.document.create({
      data: {
        documentTypeId: data.documentTypeId,
        title: data.title,
        description: data.description,
        warehouseEntryId: data.warehouseEntryId,
        prescriptionId: data.prescriptionId,
      },
      include: {
        documentType: true,
      },
    });

    return this.toEntity(document);
  }

  async update(id: string, data: UpdateDocumentData): Promise<DocumentEntity> {
    const document = await this.prisma.document.update({
      where: { id },
      data: {
        documentTypeId: data.documentTypeId,
        title: data.title,
        description: data.description,
        warehouseEntryId: data.warehouseEntryId,
        prescriptionId: data.prescriptionId,
      },
      include: {
        documentType: true,
      },
    });

    return this.toEntity(document);
  }

  async markAsOcrProcessed(id: string): Promise<DocumentEntity> {
    const document = await this.prisma.document.update({
      where: { id },
      data: {
        status: 'OCR_PROCESSED',
      },
      include: {
        documentType: true,
      },
    });

    return this.toEntity(document);
  }

  async markAsValidated(id: string): Promise<DocumentEntity> {
    const document = await this.prisma.document.update({
      where: { id },
      data: {
        status: 'VALIDATED',
      },
      include: {
        documentType: true,
      },
    });

    return this.toEntity(document);
  }

  async markAsRejected(id: string): Promise<DocumentEntity> {
    const document = await this.prisma.document.update({
      where: { id },
      data: {
        status: 'REJECTED',
      },
      include: {
        documentType: true,
      },
    });

    return this.toEntity(document);
  }

  private toEntity(document: any): DocumentEntity {
    return new DocumentEntity(
      document.id,
      document.documentTypeId,
      document.status,
      document.title,
      document.description,
      document.warehouseEntryId,
      document.prescriptionId,
      document.documentType?.code ?? null,
      document.documentType?.name ?? null,
      document.createdAt,
      document.updatedAt,
    );
  }
}
