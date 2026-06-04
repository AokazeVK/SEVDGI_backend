import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CreateDocumentTypeDto } from '../dto/create-document-type.dto';
import { DOCUMENT_TYPES_REPOSITORY } from '../../domain/repositories/document-types.repository';
import type { DocumentTypesRepository } from '../../domain/repositories/document-types.repository';

@Injectable()
export class CreateDocumentTypeUseCase {
  constructor(
    @Inject(DOCUMENT_TYPES_REPOSITORY)
    private readonly repository: DocumentTypesRepository,
  ) {}

  async execute(dto: CreateDocumentTypeDto) {
    const normalizedCode = dto.code.trim().toUpperCase();

    const exists = await this.repository.findByCode(normalizedCode);

    if (exists) {
      throw new BadRequestException('Ya existe un tipo de documento con ese código');
    }

    return this.repository.create({
      code: normalizedCode,
      name: dto.name,
      description: dto.description,
      isRequired: dto.isRequired,
    });
  }
}
