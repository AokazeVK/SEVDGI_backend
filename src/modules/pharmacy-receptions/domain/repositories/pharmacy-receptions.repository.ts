import { PharmacyReceptionEntity } from '../entities/pharmacy-reception.entity';

export const PHARMACY_RECEPTIONS_REPOSITORY = Symbol('PHARMACY_RECEPTIONS_REPOSITORY');

export interface CreatePharmacyReceptionData {
  pharmacyId: string;
  dispatchId: string;
}

export interface PharmacyReceptionsRepository {
  findAll(): Promise<PharmacyReceptionEntity[]>;
  findById(id: string): Promise<PharmacyReceptionEntity | null>;
  create(data: CreatePharmacyReceptionData): Promise<PharmacyReceptionEntity>;
}
