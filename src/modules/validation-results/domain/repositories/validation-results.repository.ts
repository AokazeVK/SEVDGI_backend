import { ValidationResultEntity } from '../entities/validation-result.entity';

export const VALIDATION_RESULTS_REPOSITORY = Symbol('VALIDATION_RESULTS_REPOSITORY');

export interface ValidationResultsRepository {
  findAll(): Promise<ValidationResultEntity[]>;
  findById(id: string): Promise<ValidationResultEntity | null>;
  findByProcess(processId: string): Promise<ValidationResultEntity[]>;
}
