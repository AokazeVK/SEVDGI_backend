import { Inject, Injectable } from '@nestjs/common';

import { DOCUMENT_TYPES_REPOSITORY } from '../../domain/repositories/document-types.repository';
import type { DocumentTypesRepository } from '../../domain/repositories/document-types.repository';

@Injectable()
export class GetDocumentTypesUseCase {
  constructor(
    @Inject(DOCUMENT_TYPES_REPOSITORY)
    private readonly repository: DocumentTypesRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
