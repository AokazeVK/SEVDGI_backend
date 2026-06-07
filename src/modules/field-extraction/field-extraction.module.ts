import { Module } from '@nestjs/common';

import { FieldExtractionController } from './infrastructure/controllers/field-extraction.controller';

import { FieldExtractionService } from './application/services/field-extraction.service';

import { ProcessFieldExtractionUseCase } from './application/use-cases/process-field-extraction.use-case';

@Module({
  controllers: [FieldExtractionController],
  providers: [FieldExtractionService, ProcessFieldExtractionUseCase],
})
export class FieldExtractionModule {}
