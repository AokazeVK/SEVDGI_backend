import { PharmacyEntity } from '../entities/pharmacy.entity';

export const PHARMACY_REPOSITORY = Symbol('PHARMACY_REPOSITORY');

export interface CreatePharmacyData {
  name: string;
  location?: string;
}

export interface UpdatePharmacyData {
  name?: string;
  location?: string;
}

export interface PharmacyRepository {
  findAll(): Promise<PharmacyEntity[]>;
  findById(id: string): Promise<PharmacyEntity | null>;
  findByName(name: string): Promise<PharmacyEntity | null>;
  create(data: CreatePharmacyData): Promise<PharmacyEntity>;
  update(id: string, data: UpdatePharmacyData): Promise<PharmacyEntity>;
  toggle(id: string): Promise<PharmacyEntity>;
}
