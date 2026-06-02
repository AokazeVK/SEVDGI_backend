import { PatientEntity } from '../entities/patient.entity';

export const PATIENTS_REPOSITORY = Symbol('PATIENTS_REPOSITORY');

export interface CreatePatientData {
  ci?: string;
  fullName: string;
  birthDate?: Date;
  phone?: string;
  address?: string;
}

export interface UpdatePatientData {
  ci?: string;
  fullName?: string;
  birthDate?: Date;
  phone?: string;
  address?: string;
}

export interface PatientsRepository {
  findAll(): Promise<PatientEntity[]>;
  findById(id: string): Promise<PatientEntity | null>;
  findByCi(ci: string): Promise<PatientEntity | null>;
  create(data: CreatePatientData): Promise<PatientEntity>;
  update(id: string, data: UpdatePatientData): Promise<PatientEntity>;
  toggle(id: string): Promise<PatientEntity>;
}
