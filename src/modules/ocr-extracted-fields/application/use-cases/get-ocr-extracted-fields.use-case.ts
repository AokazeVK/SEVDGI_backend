import { Inject, Injectable } from '@nestjs/common';

import { OCR_EXTRACTED_FIELDS_REPOSITORY } from '../../domain/repositories/ocr-extracted-fields.repository';
import type { OcrExtractedFieldsRepository } from '../../domain/repositories/ocr-extracted-fields.repository';

@Injectable()
export class GetOcrExtractedFieldsUseCase {
  constructor(
    @Inject(OCR_EXTRACTED_FIELDS_REPOSITORY)
    private readonly repository: OcrExtractedFieldsRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
