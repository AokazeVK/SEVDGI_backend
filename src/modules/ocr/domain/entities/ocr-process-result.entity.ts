export class OcrProcessResultEntity {
  constructor(
    public readonly documentId: string,
    public readonly documentFileId: string,
    public readonly ocrResultId: string,
    public readonly rawText: string,
    public readonly confidence: number | null,
  ) {}
}
