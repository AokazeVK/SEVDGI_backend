import { MedicineEntity } from '../entities/medicine.entity';

export const MEDICINES_REPOSITORY = Symbol('MEDICINES_REPOSITORY');

export interface CreateMedicineData {
  code?: string;
  name: string;
  description?: string;
  concentration?: string;
  presentation?: string;
  pharmaceuticalFormId?: string;
  unitId?: string;
  therapeuticGroupId?: string;
  manufacturerId?: string;
  activeIngredientIds?: string[];
}

export interface UpdateMedicineData {
  code?: string;
  name?: string;
  description?: string;
  concentration?: string;
  presentation?: string;
  pharmaceuticalFormId?: string;
  unitId?: string;
  therapeuticGroupId?: string;
  manufacturerId?: string;
  activeIngredientIds?: string[];
}

export interface MedicinesRepository {
  findAll(): Promise<MedicineEntity[]>;
  findById(id: string): Promise<MedicineEntity | null>;
  findByCode(code: string): Promise<MedicineEntity | null>;
  findByName(name: string): Promise<MedicineEntity | null>;
  create(data: CreateMedicineData): Promise<MedicineEntity>;
  update(id: string, data: UpdateMedicineData): Promise<MedicineEntity>;
  toggle(id: string): Promise<MedicineEntity>;
}
