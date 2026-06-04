export class DocumentFileEntity {
  constructor(
    public readonly id: string,
    public readonly documentId: string,
    public readonly filePath: string,
    public readonly fileName: string,
    public readonly mimeType: string,
    public readonly size: number | null,
    public readonly createdAt: Date,
  ) {}
}
