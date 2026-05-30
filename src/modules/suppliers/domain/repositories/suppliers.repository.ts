import { SupplierEntity } from '../entities/supplier.entity';

export const SUPPLIERS_REPOSITORY = Symbol('SUPPLIERS_REPOSITORY');

export interface CreateSupplierData {
  nit?: string;
  name: string;
  phone?: string;
  address?: string;
}

export interface UpdateSupplierData {
  nit?: string;
  name?: string;
  phone?: string;
  address?: string;
}

export interface SuppliersRepository {
  findAll(): Promise<SupplierEntity[]>;
  findById(id: string): Promise<SupplierEntity | null>;
  findByNit(nit: string): Promise<SupplierEntity | null>;

  create(data: CreateSupplierData): Promise<SupplierEntity>;

  update(id: string, data: UpdateSupplierData): Promise<SupplierEntity>;

  toggle(id: string): Promise<SupplierEntity>;
}
