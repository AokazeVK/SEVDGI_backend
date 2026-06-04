import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { OCR_RESULTS_REPOSITORY } from '../../domain/repositories/ocr-results.repository';
import type { OcrResultsRepository } from '../../domain/repositories/ocr-results.repository';

@Injectable()
export class GetOcrResultByIdUseCase {
  constructor(
    @Inject(OCR_RESULTS_REPOSITORY)
    private readonly repository: OcrResultsRepository,
  ) {}

  async execute(id: string) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new NotFoundException('Resultado OCR no encontrado');
    }

    return item;
  }
}
