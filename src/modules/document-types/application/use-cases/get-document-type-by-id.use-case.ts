import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { DOCUMENT_TYPES_REPOSITORY } from '../../domain/repositories/document-types.repository';
import type { DocumentTypesRepository } from '../../domain/repositories/document-types.repository';

@Injectable()
export class GetDocumentTypeByIdUseCase {
  constructor(
    @Inject(DOCUMENT_TYPES_REPOSITORY)
    private readonly repository: DocumentTypesRepository,
  ) {}

  async execute(id: string) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new NotFoundException('Tipo de documento no encontrado');
    }

    return item;
  }
}
