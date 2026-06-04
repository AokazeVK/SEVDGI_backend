import { Inject, Injectable } from '@nestjs/common';

import { OCR_RESULTS_REPOSITORY } from '../../domain/repositories/ocr-results.repository';
import type { OcrResultsRepository } from '../../domain/repositories/ocr-results.repository';

@Injectable()
export class GetOcrResultsUseCase {
  constructor(
    @Inject(OCR_RESULTS_REPOSITORY)
    private readonly repository: OcrResultsRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
