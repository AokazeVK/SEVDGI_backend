import { Inject, Injectable } from '@nestjs/common';

import { CreateOcrExtractedFieldDto } from '../dto/create-ocr-extracted-field.dto';
import { OCR_EXTRACTED_FIELDS_REPOSITORY } from '../../domain/repositories/ocr-extracted-fields.repository';
import type { OcrExtractedFieldsRepository } from '../../domain/repositories/ocr-extracted-fields.repository';

@Injectable()
export class CreateOcrExtractedFieldUseCase {
  constructor(
    @Inject(OCR_EXTRACTED_FIELDS_REPOSITORY)
    private readonly repository: OcrExtractedFieldsRepository,
  ) {}

  execute(dto: CreateOcrExtractedFieldDto) {
    return this.repository.create(dto);
  }
}
