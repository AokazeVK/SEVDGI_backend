import { PharmacyDispensationEntity } from '../entities/pharmacy-dispensation.entity';

export const PHARMACY_DISPENSATIONS_REPOSITORY = Symbol('PHARMACY_DISPENSATIONS_REPOSITORY');

export interface CreatePharmacyDispensationData {
  pharmacyId: string;
  patientId: string;
  prescriptionId: string;
}

export interface PharmacyDispensationsRepository {
  findAll(): Promise<PharmacyDispensationEntity[]>;
  findById(id: string): Promise<PharmacyDispensationEntity | null>;
  create(data: CreatePharmacyDispensationData): Promise<PharmacyDispensationEntity>;
}
