import { ValidationProcessEntity } from '../entities/validation-process.entity';

export const VALIDATION_PROCESSES_REPOSITORY = Symbol('VALIDATION_PROCESSES_REPOSITORY');

export interface CreateValidationProcessData {
  documentId?: string;
  warehouseEntryId?: string;
}

export interface UpdateValidationProcessStatusData {
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'OBSERVED';
}

export interface ValidationProcessesRepository {
  findAll(): Promise<ValidationProcessEntity[]>;
  findById(id: string): Promise<ValidationProcessEntity | null>;
  findByDocument(documentId: string): Promise<ValidationProcessEntity[]>;
  findByWarehouseEntry(warehouseEntryId: string): Promise<ValidationProcessEntity[]>;
  create(data: CreateValidationProcessData): Promise<ValidationProcessEntity>;
  updateStatus(
    id: string,
    data: UpdateValidationProcessStatusData,
  ): Promise<ValidationProcessEntity>;
}
