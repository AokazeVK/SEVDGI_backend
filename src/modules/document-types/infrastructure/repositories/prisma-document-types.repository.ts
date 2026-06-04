import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';
import { DocumentTypeEntity } from '../../domain/entities/document-type.entity';
import {
  CreateDocumentTypeData,
  DocumentTypesRepository,
  UpdateDocumentTypeData,
} from '../../domain/repositories/document-types.repository';

@Injectable()
export class PrismaDocumentTypesRepository implements DocumentTypesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<DocumentTypeEntity[]> {
    const items = await this.prisma.documentType.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return items.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<DocumentTypeEntity | null> {
    const item = await this.prisma.documentType.findUnique({
      where: { id },
    });

    return item ? this.toEntity(item) : null;
  }

  async findByCode(code: string): Promise<DocumentTypeEntity | null> {
    const item = await this.prisma.documentType.findUnique({
      where: { code },
    });

    return item ? this.toEntity(item) : null;
  }

  async create(data: CreateDocumentTypeData): Promise<DocumentTypeEntity> {
    const item = await this.prisma.documentType.create({
      data: {
        code: data.code,
        name: data.name,
        description: data.description,
        isRequired: data.isRequired ?? false,
      },
    });

    return this.toEntity(item);
  }

  async update(id: string, data: UpdateDocumentTypeData): Promise<DocumentTypeEntity> {
    const item = await this.prisma.documentType.update({
      where: { id },
      data: {
        code: data.code,
        name: data.name,
        description: data.description,
        isRequired: data.isRequired,
      },
    });

    return this.toEntity(item);
  }

  async toggle(id: string): Promise<DocumentTypeEntity> {
    const current = await this.prisma.documentType.findUnique({
      where: { id },
      select: { isActive: true },
    });

    const item = await this.prisma.documentType.update({
      where: { id },
      data: {
        isActive: !current?.isActive,
      },
    });

    return this.toEntity(item);
  }

  private toEntity(item: any): DocumentTypeEntity {
    return new DocumentTypeEntity(
      item.id,
      item.code,
      item.name,
      item.description,
      item.isRequired,
      item.isActive,
    );
  }
}
