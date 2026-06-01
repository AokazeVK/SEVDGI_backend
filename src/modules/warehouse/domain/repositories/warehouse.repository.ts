import { WarehouseEntity } from '../entities/warehouse.entity';

export const WAREHOUSE_REPOSITORY = Symbol('WAREHOUSE_REPOSITORY');

export interface CreateWarehouseData {
  name: string;
  description?: string;
  location?: string;
}

export interface UpdateWarehouseData {
  name?: string;
  description?: string;
  location?: string;
}

export interface WarehouseRepository {
  findAll(): Promise<WarehouseEntity[]>;
  findById(id: string): Promise<WarehouseEntity | null>;
  findByName(name: string): Promise<WarehouseEntity | null>;
  create(data: CreateWarehouseData): Promise<WarehouseEntity>;
  update(id: string, data: UpdateWarehouseData): Promise<WarehouseEntity>;
  toggle(id: string): Promise<WarehouseEntity>;
}
