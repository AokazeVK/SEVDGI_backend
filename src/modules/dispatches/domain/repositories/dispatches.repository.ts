import { DispatchEntity } from '../entities/dispatch.entity';

export const DISPATCHES_REPOSITORY = Symbol('DISPATCHES_REPOSITORY');

export interface CreateDispatchData {
  requestId: string;
  warehouseId: string;
}

export interface DispatchesRepository {
  findAll(): Promise<DispatchEntity[]>;
  findById(id: string): Promise<DispatchEntity | null>;
  create(data: CreateDispatchData): Promise<DispatchEntity>;
  cancel(id: string): Promise<DispatchEntity>;
}
