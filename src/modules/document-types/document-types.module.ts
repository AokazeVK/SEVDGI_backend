import { Module } from '@nestjs/common';

import { DOCUMENT_TYPES_REPOSITORY } from './domain/repositories/document-types.repository';
import { PrismaDocumentTypesRepository } from './infrastructure/repositories/prisma-document-types.repository';

import { DocumentTypesController } from './infrastructure/controllers/document-types.controller';

import { CreateDocumentTypeUseCase } from './application/use-cases/create-document-type.use-case';
import { GetDocumentTypeByIdUseCase } from './application/use-cases/get-document-type-by-id.use-case';
import { GetDocumentTypesUseCase } from './application/use-cases/get-document-types.use-case';
import { ToggleDocumentTypeUseCase } from './application/use-cases/toggle-document-type.use-case';
import { UpdateDocumentTypeUseCase } from './application/use-cases/update-document-type.use-case';

@Module({
  controllers: [DocumentTypesController],
  providers: [
    GetDocumentTypesUseCase,
    GetDocumentTypeByIdUseCase,
    CreateDocumentTypeUseCase,
    UpdateDocumentTypeUseCase,
    ToggleDocumentTypeUseCase,
    {
      provide: DOCUMENT_TYPES_REPOSITORY,
      useClass: PrismaDocumentTypesRepository,
    },
  ],
})
export class DocumentTypesModule {}
