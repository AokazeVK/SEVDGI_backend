export class DocumentEntity {
  constructor(
    public readonly id: string,
    public readonly documentTypeId: string,
    public readonly status: string,
    public readonly title: string | null,
    public readonly description: string | null,
    public readonly warehouseEntryId: string | null,
    public readonly prescriptionId: string | null,
    public readonly documentTypeCode: string | null = null,
    public readonly documentTypeName: string | null = null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
