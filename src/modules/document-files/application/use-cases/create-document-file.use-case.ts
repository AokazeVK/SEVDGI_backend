import { Inject, Injectable } from '@nestjs/common';

import { CreateDocumentFileDto } from '../dto/create-document-file.dto';
import { DOCUMENT_FILES_REPOSITORY } from '../../domain/repositories/document-files.repository';
import type { DocumentFilesRepository } from '../../domain/repositories/document-files.repository';

@Injectable()
export class CreateDocumentFileUseCase {
  constructor(
    @Inject(DOCUMENT_FILES_REPOSITORY)
    private readonly repository: DocumentFilesRepository,
  ) {}

  execute(dto: CreateDocumentFileDto) {
    return this.repository.create(dto);
  }
}
