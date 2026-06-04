import { Module } from '@nestjs/common';

import { OCR_RESULTS_REPOSITORY } from './domain/repositories/ocr-results.repository';
import { PrismaOcrResultsRepository } from './infrastructure/repositories/prisma-ocr-results.repository';

import { OcrResultsController } from './infrastructure/controllers/ocr-results.controller';

import { CreateOcrResultUseCase } from './application/use-cases/create-ocr-result.use-case';
import { GetOcrResultByIdUseCase } from './application/use-cases/get-ocr-result-by-id.use-case';
import { GetOcrResultsByDocumentUseCase } from './application/use-cases/get-ocr-results-by-document.use-case';
import { GetOcrResultsUseCase } from './application/use-cases/get-ocr-results.use-case';

@Module({
  controllers: [OcrResultsController],
  providers: [
    GetOcrResultsUseCase,
    GetOcrResultByIdUseCase,
    GetOcrResultsByDocumentUseCase,
    CreateOcrResultUseCase,
    {
      provide: OCR_RESULTS_REPOSITORY,
      useClass: PrismaOcrResultsRepository,
    },
  ],
})
export class OcrResultsModule {}
