import { PharmaceuticalFormEntity } from '../entities/pharmaceutical-form.entity';

export const PHARMACEUTICAL_FORMS_REPOSITORY = Symbol('PHARMACEUTICAL_FORMS_REPOSITORY');

export interface CreatePharmaceuticalFormData {
  name: string;
}

export interface UpdatePharmaceuticalFormData {
  name?: string;
}

export interface PharmaceuticalFormsRepository {
  findAll(): Promise<PharmaceuticalFormEntity[]>;
  findById(id: string): Promise<PharmaceuticalFormEntity | null>;
  findByName(name: string): Promise<PharmaceuticalFormEntity | null>;

  create(data: CreatePharmaceuticalFormData): Promise<PharmaceuticalFormEntity>;

  update(id: string, data: UpdatePharmaceuticalFormData): Promise<PharmaceuticalFormEntity>;

  toggle(id: string): Promise<PharmaceuticalFormEntity>;
}
