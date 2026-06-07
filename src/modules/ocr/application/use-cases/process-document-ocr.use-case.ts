import { Injectable } from '@nestjs/common';

import { OcrService } from '../services/ocr.service';

@Injectable()
export class ProcessDocumentOcrUseCase {
  constructor(private readonly ocrService: OcrService) {}

  execute(documentId: string) {
    return this.ocrService.processDocument(documentId);
  }
}
