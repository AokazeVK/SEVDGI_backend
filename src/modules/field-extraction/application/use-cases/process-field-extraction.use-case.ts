import { Injectable } from '@nestjs/common';

import { FieldExtractionService } from '../services/field-extraction.service';

@Injectable()
export class ProcessFieldExtractionUseCase {
  constructor(private readonly fieldExtractionService: FieldExtractionService) {}

  execute(ocrResultId: string) {
    return this.fieldExtractionService.process(ocrResultId);
  }
}
