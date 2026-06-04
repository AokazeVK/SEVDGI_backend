export class DocumentTypeEntity {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly name: string,
    public readonly description: string | null,
    public readonly isRequired: boolean,
    public readonly isActive: boolean,
  ) {}
}
