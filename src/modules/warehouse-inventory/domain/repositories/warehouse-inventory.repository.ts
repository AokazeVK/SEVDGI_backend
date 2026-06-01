import { WarehouseInventoryEntity } from '../entities/warehouse-inventory.entity';

export const WAREHOUSE_INVENTORY_REPOSITORY = Symbol('WAREHOUSE_INVENTORY_REPOSITORY');

export interface WarehouseInventoryRepository {
  findAll(): Promise<WarehouseInventoryEntity[]>;

  findById(id: string): Promise<WarehouseInventoryEntity | null>;

  findByWarehouse(warehouseId: string): Promise<WarehouseInventoryEntity[]>;

  findByMedicine(medicineId: string): Promise<WarehouseInventoryEntity[]>;

  findAvailableByMedicineFefo(
    warehouseId: string,
    medicineId: string,
  ): Promise<WarehouseInventoryEntity[]>;
}
