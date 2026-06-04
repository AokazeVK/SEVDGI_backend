export class OcrResultEntity {
  constructor(
    public readonly id: string,
    public readonly documentId: string,
    public readonly rawText: string,
    public readonly confidence: number | null,
    public readonly createdAt: Date,
  ) {}
}
