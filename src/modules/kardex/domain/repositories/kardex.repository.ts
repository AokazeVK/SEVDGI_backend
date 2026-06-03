import { KardexEntity } from '../entities/kardex.entity';

export const KARDEX_REPOSITORY = Symbol('KARDEX_REPOSITORY');

export interface KardexRepository {
  findAll(): Promise<KardexEntity[]>;

  findById(id: string): Promise<KardexEntity | null>;

  findByMedicine(medicineId: string): Promise<KardexEntity[]>;

  findByWarehouse(warehouseId: string): Promise<KardexEntity[]>;

  findByPharmacy(pharmacyId: string): Promise<KardexEntity[]>;
}
