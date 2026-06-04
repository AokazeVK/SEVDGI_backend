import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { UpdateDocumentDto } from '../dto/update-document.dto';
import { DOCUMENTS_REPOSITORY } from '../../domain/repositories/documents.repository';
import type { DocumentsRepository } from '../../domain/repositories/documents.repository';

@Injectable()
export class UpdateDocumentUseCase {
  constructor(
    @Inject(DOCUMENTS_REPOSITORY)
    private readonly repository: DocumentsRepository,
  ) {}

  async execute(id: string, dto: UpdateDocumentDto) {
    const document = await this.repository.findById(id);

    if (!document) {
      throw new NotFoundException('Documento no encontrado');
    }

    return this.repository.update(id, dto);
  }
}
