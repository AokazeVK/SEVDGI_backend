import { Module } from '@nestjs/common';

import { DOCUMENT_FILES_REPOSITORY } from './domain/repositories/document-files.repository';
import { PrismaDocumentFilesRepository } from './infrastructure/repositories/prisma-document-files.repository';

import { DocumentFilesController } from './infrastructure/controllers/document-files.controller';

import { CreateDocumentFileUseCase } from './application/use-cases/create-document-file.use-case';
import { GetDocumentFileByIdUseCase } from './application/use-cases/get-document-file-by-id.use-case';
import { GetDocumentFilesByDocumentUseCase } from './application/use-cases/get-document-files-by-document.use-case';
import { GetDocumentFilesUseCase } from './application/use-cases/get-document-files.use-case';

@Module({
  controllers: [DocumentFilesController],
  providers: [
    GetDocumentFilesUseCase,
    GetDocumentFileByIdUseCase,
    GetDocumentFilesByDocumentUseCase,
    CreateDocumentFileUseCase,
    {
      provide: DOCUMENT_FILES_REPOSITORY,
      useClass: PrismaDocumentFilesRepository,
    },
  ],
})
export class DocumentFilesModule {}
