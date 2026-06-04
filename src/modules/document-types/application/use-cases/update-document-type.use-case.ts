import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { UpdateDocumentTypeDto } from '../dto/update-document-type.dto';
import { DOCUMENT_TYPES_REPOSITORY } from '../../domain/repositories/document-types.repository';
import type { DocumentTypesRepository } from '../../domain/repositories/document-types.repository';

@Injectable()
export class UpdateDocumentTypeUseCase {
  constructor(
    @Inject(DOCUMENT_TYPES_REPOSITORY)
    private readonly repository: DocumentTypesRepository,
  ) {}

  async execute(id: string, dto: UpdateDocumentTypeDto) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new NotFoundException('Tipo de documento no encontrado');
    }

    const normalizedCode = dto.code?.trim().toUpperCase();

    if (normalizedCode && normalizedCode !== item.code) {
      const exists = await this.repository.findByCode(normalizedCode);

      if (exists) {
        throw new BadRequestException('Ya existe un tipo de documento con ese código');
      }
    }

    return this.repository.update(id, {
      code: normalizedCode,
      name: dto.name,
      description: dto.description,
      isRequired: dto.isRequired,
    });
  }
}
