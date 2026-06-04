export class OcrExtractedFieldEntity {
  constructor(
    public readonly id: string,
    public readonly ocrResultId: string,
    public readonly fieldName: string,
    public readonly value: string | null,
    public readonly confidence: number | null,
  ) {}
}
