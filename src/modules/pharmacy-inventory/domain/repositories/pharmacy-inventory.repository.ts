import { PharmacyInventoryEntity } from '../entities/pharmacy-inventory.entity';

export const PHARMACY_INVENTORY_REPOSITORY = Symbol('PHARMACY_INVENTORY_REPOSITORY');

export interface PharmacyInventoryRepository {
  findAll(): Promise<PharmacyInventoryEntity[]>;

  findById(id: string): Promise<PharmacyInventoryEntity | null>;

  findByPharmacy(pharmacyId: string): Promise<PharmacyInventoryEntity[]>;

  findByMedicine(medicineId: string): Promise<PharmacyInventoryEntity[]>;

  findAvailableByMedicineFefo(
    pharmacyId: string,
    medicineId: string,
  ): Promise<PharmacyInventoryEntity[]>;
}
