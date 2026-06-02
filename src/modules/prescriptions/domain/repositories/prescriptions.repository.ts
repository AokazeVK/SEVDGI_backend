import { PrescriptionEntity } from '../entities/prescription.entity';

export const PRESCRIPTIONS_REPOSITORY = Symbol('PRESCRIPTIONS_REPOSITORY');

export interface CreatePrescriptionData {
  patientId: string;
  doctorId?: string;
  medicalServiceId?: string;
  prescriptionNumber?: string;
  issuedAt?: Date;
  diagnosis?: string;
  observation?: string;
  details: {
    medicineId: string;
    dosage?: string;
    frequency?: string;
    duration?: string;
    quantity: number;
  }[];
}

export interface PrescriptionsRepository {
  findAll(): Promise<PrescriptionEntity[]>;
  findById(id: string): Promise<PrescriptionEntity | null>;
  findByPrescriptionNumber(prescriptionNumber: string): Promise<PrescriptionEntity | null>;
  create(data: CreatePrescriptionData): Promise<PrescriptionEntity>;
  cancel(id: string): Promise<PrescriptionEntity>;
}
