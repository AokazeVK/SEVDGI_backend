export class SupplierEntity {
  constructor(
    public readonly id: string,
    public readonly nit: string | null,
    public readonly name: string,
    public readonly phone: string | null,
    public readonly address: string | null,
    public readonly isActive: boolean,
  ) {}
}
