export class ExtractedFieldEntity {
  constructor(
    public readonly fieldName: string,
    public readonly value: string,
    public readonly confidence: number,
  ) {}
}
