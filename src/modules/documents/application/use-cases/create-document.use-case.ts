import { Inject, Injectable } from '@nestjs/common';

import { CreateDocumentDto } from '../dto/create-document.dto';
import { DOCUMENTS_REPOSITORY } from '../../domain/repositories/documents.repository';
import type { DocumentsRepository } from '../../domain/repositories/documents.repository';

@Injectable()
export class CreateDocumentUseCase {
  constructor(
    @Inject(DOCUMENTS_REPOSITORY)
    private readonly repository: DocumentsRepository,
  ) {}

  execute(dto: CreateDocumentDto) {
    return this.repository.create(dto);
  }
}
