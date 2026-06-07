import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../../../core/prisma/prisma.service';

@Injectable()
export class FieldExtractionService {
  constructor(private readonly prisma: PrismaService) {}

  async process(ocrResultId: string) {
    const ocrResult = await this.prisma.ocrResult.findUnique({
      where: {
        id: ocrResultId,
      },
    });

    if (!ocrResult) {
      throw new NotFoundException('OCR Result no encontrado');
    }

    const text = ocrResult.rawText;

    const fields = [
      {
        fieldName: 'CLIENTE',
        value: this.extract(text, /Cliente:\s*(.+)/i),
      },
      {
        fieldName: 'AREA',
        value: this.extract(text, /Area:\s*(.+)/i),
      },
      {
        fieldName: 'FECHA',
        value: this.extract(text, /Fecha:\s*([0-9-]+)/i),
      },
      {
        fieldName: 'RESPONSABLE',
        value: this.extract(text, /Responsable:\s*(.+)/i),
      },
    ].filter((x) => x.value);
    const createdFields: any[] = [];

    for (const field of fields) {
      const created = await this.prisma.ocrExtractedField.create({
        data: {
          ocrResultId,
          fieldName: field.fieldName,
          value: field.value,
          confidence: ocrResult.confidence,
        },
      });

      createdFields.push(created);
    }

    return createdFields;
  }

  private extract(text: string, regex: RegExp): string | null {
    const match = text.match(regex);

    if (!match) {
      return null;
    }

    return match[1]?.trim() ?? null;
  }
}
