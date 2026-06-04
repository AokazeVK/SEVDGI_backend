import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { OCR_EXTRACTED_FIELDS_REPOSITORY } from '../../domain/repositories/ocr-extracted-fields.repository';
import type { OcrExtractedFieldsRepository } from '../../domain/repositories/ocr-extracted-fields.repository';

@Injectable()
export class GetOcrExtractedFieldByIdUseCase {
  constructor(
    @Inject(OCR_EXTRACTED_FIELDS_REPOSITORY)
    private readonly repository: OcrExtractedFieldsRepository,
  ) {}

  async execute(id: string) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new NotFoundException('Campo extraído por OCR no encontrado');
    }

    return item;
  }
}
