export class MedicineEntity {
  constructor(
    public readonly id: string,
    public readonly code: string | null,
    public readonly name: string,
    public readonly description: string | null,
    public readonly concentration: string | null,
    public readonly presentation: string | null,
    public readonly pharmaceuticalFormId: string | null,
    public readonly unitId: string | null,
    public readonly therapeuticGroupId: string | null,
    public readonly manufacturerId: string | null,
    public readonly activeIngredients: string[] = [],
    public readonly isActive: boolean,
  ) {}
}
