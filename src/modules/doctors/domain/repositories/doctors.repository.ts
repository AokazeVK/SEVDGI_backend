import { DoctorEntity } from '../entities/doctor.entity';

export const DOCTORS_REPOSITORY = Symbol('DOCTORS_REPOSITORY');

export interface CreateDoctorData {
  fullName: string;
  licenseNumber?: string;
  specialty?: string;
}

export interface UpdateDoctorData {
  fullName?: string;
  licenseNumber?: string;
  specialty?: string;
}

export interface DoctorsRepository {
  findAll(): Promise<DoctorEntity[]>;
  findById(id: string): Promise<DoctorEntity | null>;
  findByLicenseNumber(licenseNumber: string): Promise<DoctorEntity | null>;
  create(data: CreateDoctorData): Promise<DoctorEntity>;
  update(id: string, data: UpdateDoctorData): Promise<DoctorEntity>;
  toggle(id: string): Promise<DoctorEntity>;
}
