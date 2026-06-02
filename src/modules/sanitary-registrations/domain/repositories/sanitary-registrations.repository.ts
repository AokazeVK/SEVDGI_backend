import { SanitaryRegistrationEntity } from '../entities/sanitary-registration.entity';

export const SANITARY_REGISTRATIONS_REPOSITORY = Symbol('SANITARY_REGISTRATIONS_REPOSITORY');

export interface CreateSanitaryRegistrationData {
  medicineId: string;
  laboratoryId: string;

  registrationNumber: string;

  issuedAt?: Date;
  expiresAt?: Date;
}

export interface UpdateSanitaryRegistrationData {
  medicineId?: string;
  laboratoryId?: string;

  registrationNumber?: string;

  issuedAt?: Date;
  expiresAt?: Date;
}

export interface SanitaryRegistrationsRepository {
  findAll(): Promise<SanitaryRegistrationEntity[]>;

  findById(id: string): Promise<SanitaryRegistrationEntity | null>;

  findByRegistrationNumber(registrationNumber: string): Promise<SanitaryRegistrationEntity | null>;

  create(data: CreateSanitaryRegistrationData): Promise<SanitaryRegistrationEntity>;

  update(id: string, data: UpdateSanitaryRegistrationData): Promise<SanitaryRegistrationEntity>;

  toggle(id: string): Promise<SanitaryRegistrationEntity>;
}
