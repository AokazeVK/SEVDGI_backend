export class AlertEntity {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly status: string,
    public readonly title: string,
    public readonly message: string,
    public readonly referenceId: string | null,
    public readonly createdAt: Date,
    public readonly resolvedAt: Date | null,
  ) {}
}
