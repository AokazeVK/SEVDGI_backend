import { MedicalServiceEntity } from '../entities/medical-service.entity';

export const MEDICAL_SERVICES_REPOSITORY = Symbol('MEDICAL_SERVICES_REPOSITORY');

export interface CreateMedicalServiceData {
  name: string;
  description?: string;
}

export interface UpdateMedicalServiceData {
  name?: string;
  description?: string;
}

export interface MedicalServicesRepository {
  findAll(): Promise<MedicalServiceEntity[]>;
  findById(id: string): Promise<MedicalServiceEntity | null>;
  findByName(name: string): Promise<MedicalServiceEntity | null>;

  create(data: CreateMedicalServiceData): Promise<MedicalServiceEntity>;

  update(id: string, data: UpdateMedicalServiceData): Promise<MedicalServiceEntity>;

  toggle(id: string): Promise<MedicalServiceEntity>;
}
