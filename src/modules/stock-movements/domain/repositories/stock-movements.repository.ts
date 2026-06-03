import { StockMovementEntity } from '../entities/stock-movement.entity';

export const STOCK_MOVEMENTS_REPOSITORY = Symbol('STOCK_MOVEMENTS_REPOSITORY');

export interface StockMovementsRepository {
  findAll(): Promise<StockMovementEntity[]>;
  findById(id: string): Promise<StockMovementEntity | null>;
  findByMedicine(medicineId: string): Promise<StockMovementEntity[]>;
  findByBatch(batchId: string): Promise<StockMovementEntity[]>;
  findByWarehouse(warehouseId: string): Promise<StockMovementEntity[]>;
  findByPharmacy(pharmacyId: string): Promise<StockMovementEntity[]>;
}
