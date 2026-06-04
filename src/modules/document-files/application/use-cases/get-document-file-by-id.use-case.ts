import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { DOCUMENT_FILES_REPOSITORY } from '../../domain/repositories/document-files.repository';
import type { DocumentFilesRepository } from '../../domain/repositories/document-files.repository';

@Injectable()
export class GetDocumentFileByIdUseCase {
  constructor(
    @Inject(DOCUMENT_FILES_REPOSITORY)
    private readonly repository: DocumentFilesRepository,
  ) {}

  async execute(id: string) {
    const file = await this.repository.findById(id);

    if (!file) {
      throw new NotFoundException('Archivo documental no encontrado');
    }

    return file;
  }
}
