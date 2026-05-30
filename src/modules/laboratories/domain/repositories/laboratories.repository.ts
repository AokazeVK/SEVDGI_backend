import { LaboratoryEntity } from '../entities/laboratory.entity';

export const LABORATORIES_REPOSITORY = Symbol('LABORATORIES_REPOSITORY');

export interface CreateLaboratoryData {
  nit?: string;
  name: string;
  country?: string;
}

export interface UpdateLaboratoryData {
  nit?: string;
  name?: string;
  country?: string;
}

export interface LaboratoriesRepository {
  findAll(): Promise<LaboratoryEntity[]>;
  findById(id: string): Promise<LaboratoryEntity | null>;
  findByNit(nit: string): Promise<LaboratoryEntity | null>;
  create(data: CreateLaboratoryData): Promise<LaboratoryEntity>;
  update(id: string, data: UpdateLaboratoryData): Promise<LaboratoryEntity>;
  toggle(id: string): Promise<LaboratoryEntity>;
}