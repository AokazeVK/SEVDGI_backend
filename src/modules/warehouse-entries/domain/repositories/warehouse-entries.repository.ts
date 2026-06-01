import { WarehouseEntryEntity } from '../entities/warehouse-entry.entity';

export const WAREHOUSE_ENTRIES_REPOSITORY = Symbol('WAREHOUSE_ENTRIES_REPOSITORY');

export interface WarehouseEntryDetailData {
  medicineId: string;
  batchId: string;
  quantity: number;
  unitCost?: number;
}

export interface CreateWarehouseEntryData {
  supplierId?: string;
  warehouseId: string;
  entryNumber?: string;
  invoiceNumber?: string;
  entryDate?: Date;
  details: WarehouseEntryDetailData[];
}

export interface UpdateWarehouseEntryData {
  supplierId?: string;
  entryNumber?: string;
  invoiceNumber?: string;
  entryDate?: Date;
}

export interface WarehouseEntriesRepository {
  findAll(): Promise<WarehouseEntryEntity[]>;
  findById(id: string): Promise<WarehouseEntryEntity | null>;
  findByEntryNumber(entryNumber: string): Promise<WarehouseEntryEntity | null>;
  create(data: CreateWarehouseEntryData): Promise<WarehouseEntryEntity>;
  update(id: string, data: UpdateWarehouseEntryData): Promise<WarehouseEntryEntity>;
}
