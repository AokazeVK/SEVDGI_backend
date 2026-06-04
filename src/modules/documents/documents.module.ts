import { Module } from '@nestjs/common';

import { DOCUMENTS_REPOSITORY } from './domain/repositories/documents.repository';
import { PrismaDocumentsRepository } from './infrastructure/repositories/prisma-documents.repository';

import { DocumentsController } from './infrastructure/controllers/documents.controller';

import { CreateDocumentUseCase } from './application/use-cases/create-document.use-case';
import { GetDocumentByIdUseCase } from './application/use-cases/get-document-by-id.use-case';
import { GetDocumentsByPrescriptionUseCase } from './application/use-cases/get-documents-by-prescription.use-case';
import { GetDocumentsByWarehouseEntryUseCase } from './application/use-cases/get-documents-by-warehouse-entry.use-case';
import { GetDocumentsUseCase } from './application/use-cases/get-documents.use-case';
import { MarkDocumentOcrProcessedUseCase } from './application/use-cases/mark-document-ocr-processed.use-case';
import { MarkDocumentRejectedUseCase } from './application/use-cases/mark-document-rejected.use-case';
import { MarkDocumentValidatedUseCase } from './application/use-cases/mark-document-validated.use-case';
import { UpdateDocumentUseCase } from './application/use-cases/update-document.use-case';

@Module({
  controllers: [DocumentsController],
  providers: [
    GetDocumentsUseCase,
    GetDocumentByIdUseCase,
    GetDocumentsByWarehouseEntryUseCase,
    GetDocumentsByPrescriptionUseCase,
    CreateDocumentUseCase,
    UpdateDocumentUseCase,
    MarkDocumentOcrProcessedUseCase,
    MarkDocumentValidatedUseCase,
    MarkDocumentRejectedUseCase,
    {
      provide: DOCUMENTS_REPOSITORY,
      useClass: PrismaDocumentsRepository,
    },
  ],
})
export class DocumentsModule {}
