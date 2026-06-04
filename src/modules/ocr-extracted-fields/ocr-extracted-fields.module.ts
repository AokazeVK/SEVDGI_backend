import { Module } from '@nestjs/common';

import { OCR_EXTRACTED_FIELDS_REPOSITORY } from './domain/repositories/ocr-extracted-fields.repository';
import { PrismaOcrExtractedFieldsRepository } from './infrastructure/repositories/prisma-ocr-extracted-fields.repository';

import { OcrExtractedFieldsController } from './infrastructure/controllers/ocr-extracted-fields.controller';

import { CreateOcrExtractedFieldUseCase } from './application/use-cases/create-ocr-extracted-field.use-case';
import { GetOcrExtractedFieldByIdUseCase } from './application/use-cases/get-ocr-extracted-field-by-id.use-case';
import { GetOcrExtractedFieldsByOcrResultUseCase } from './application/use-cases/get-ocr-extracted-fields-by-ocr-result.use-case';
import { GetOcrExtractedFieldsUseCase } from './application/use-cases/get-ocr-extracted-fields.use-case';

@Module({
  controllers: [OcrExtractedFieldsController],
  providers: [
    GetOcrExtractedFieldsUseCase,
    GetOcrExtractedFieldByIdUseCase,
    GetOcrExtractedFieldsByOcrResultUseCase,
    CreateOcrExtractedFieldUseCase,
    {
      provide: OCR_EXTRACTED_FIELDS_REPOSITORY,
      useClass: PrismaOcrExtractedFieldsRepository,
    },
  ],
})
export class OcrExtractedFieldsModule {}
