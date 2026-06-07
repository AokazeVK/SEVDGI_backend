import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { OcrProvider, OcrProviderResult } from '../../domain/providers/ocr-provider';

@Injectable()
export class HttpOcrProvider implements OcrProvider {
  private readonly baseUrl = process.env.OCR_SERVICE_URL ?? 'http://localhost:8000';

  async processFile(filePath: string): Promise<OcrProviderResult> {
    const response = await fetch(`${this.baseUrl}/ocr/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filePath }),
    });

    if (!response.ok) {
      throw new InternalServerErrorException('Error al procesar OCR en el servicio externo');
    }

    const data = await response.json();

    return {
      rawText: data.rawText ?? '',
      confidence: typeof data.confidence === 'number' ? data.confidence : null,
    };
  }
}
