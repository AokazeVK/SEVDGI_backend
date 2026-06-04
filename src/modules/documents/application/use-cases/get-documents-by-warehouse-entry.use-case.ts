import { Inject, Injectable } from '@nestjs/common';

import { DOCUMENTS_REPOSITORY } from '../../domain/repositories/documents.repository';
import type { DocumentsRepository } from '../../domain/repositories/documents.repository';

@Injectable()
export class GetDocumentsByWarehouseEntryUseCase {
  constructor(
    @Inject(DOCUMENTS_REPOSITORY)
    private readonly repository: DocumentsRepository,
  ) {}

  execute(warehouseEntryId: string) {
    return this.repository.findByWarehouseEntry(warehouseEntryId);
  }
}
