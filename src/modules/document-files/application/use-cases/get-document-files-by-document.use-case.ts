import { Inject, Injectable } from '@nestjs/common';

import { DOCUMENT_FILES_REPOSITORY } from '../../domain/repositories/document-files.repository';
import type { DocumentFilesRepository } from '../../domain/repositories/document-files.repository';

@Injectable()
export class GetDocumentFilesByDocumentUseCase {
  constructor(
    @Inject(DOCUMENT_FILES_REPOSITORY)
    private readonly repository: DocumentFilesRepository,
  ) {}

  execute(documentId: string) {
    return this.repository.findByDocument(documentId);
  }
}
