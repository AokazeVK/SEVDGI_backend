import { Inject, Injectable } from '@nestjs/common';

import { CreateOcrResultDto } from '../dto/create-ocr-result.dto';
import { OCR_RESULTS_REPOSITORY } from '../../domain/repositories/ocr-results.repository';
import type { OcrResultsRepository } from '../../domain/repositories/ocr-results.repository';

@Injectable()
export class CreateOcrResultUseCase {
  constructor(
    @Inject(OCR_RESULTS_REPOSITORY)
    private readonly repository: OcrResultsRepository,
  ) {}

  execute(dto: CreateOcrResultDto) {
    return this.repository.create(dto);
  }
}
