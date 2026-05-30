import { ManufacturerEntity } from '../entities/manufacturer.entity';

export const MANUFACTURERS_REPOSITORY = Symbol('MANUFACTURERS_REPOSITORY');

export interface CreateManufacturerData {
  name: string;
  country?: string;
}

export interface UpdateManufacturerData {
  name?: string;
  country?: string;
}

export interface ManufacturersRepository {
  findAll(): Promise<ManufacturerEntity[]>;
  findById(id: string): Promise<ManufacturerEntity | null>;
  findByName(name: string): Promise<ManufacturerEntity | null>;
  create(data: CreateManufacturerData): Promise<ManufacturerEntity>;
  update(id: string, data: UpdateManufacturerData): Promise<ManufacturerEntity>;
  toggle(id: string): Promise<ManufacturerEntity>;
}