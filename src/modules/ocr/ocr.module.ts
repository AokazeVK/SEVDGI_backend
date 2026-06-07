import { Module } from '@nestjs/common';

import { OcrService } from './application/services/ocr.service';
import { ProcessDocumentOcrUseCase } from './application/use-cases/process-document-ocr.use-case';

import { OCR_PROVIDER } from './domain/providers/ocr-provider';
import { HttpOcrProvider } from './infrastructure/providers/http-ocr.provider';

import { OcrController } from './infrastructure/controllers/ocr.controller';

@Module({
  controllers: [OcrController],
  providers: [
    OcrService,
    ProcessDocumentOcrUseCase,
    {
      provide: OCR_PROVIDER,
      useClass: HttpOcrProvider,
    },
  ],
})
export class OcrModule {}
