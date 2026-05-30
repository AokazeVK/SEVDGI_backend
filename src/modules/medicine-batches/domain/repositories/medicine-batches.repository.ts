import { MedicineBatchEntity } from '../entities/medicine-batch.entity';

export const MEDICINE_BATCHES_REPOSITORY = Symbol('MEDICINE_BATCHES_REPOSITORY');

export interface CreateMedicineBatchData {
  medicineId: string;
  batchNumber: string;
  expirationDate: Date;
}

export interface UpdateMedicineBatchData {
  batchNumber?: string;
  expirationDate?: Date;
}

export interface MedicineBatchesRepository {
  findAll(): Promise<MedicineBatchEntity[]>;
  findById(id: string): Promise<MedicineBatchEntity | null>;
  findByMedicineAndBatchNumber(
    medicineId: string,
    batchNumber: string,
  ): Promise<MedicineBatchEntity | null>;
  create(data: CreateMedicineBatchData): Promise<MedicineBatchEntity>;
  update(id: string, data: UpdateMedicineBatchData): Promise<MedicineBatchEntity>;
  toggle(id: string): Promise<MedicineBatchEntity>;
}
