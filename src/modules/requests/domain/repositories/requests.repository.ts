import { RequestEntity } from '../entities/request.entity';

export const REQUESTS_REPOSITORY = Symbol('REQUESTS_REPOSITORY');

export interface CreateRequestData {
  pharmacyId: string;
  observation?: string;
  details: {
    medicineId: string;
    quantity: number;
  }[];
}

export interface RequestsRepository {
  findAll(): Promise<RequestEntity[]>;
  findById(id: string): Promise<RequestEntity | null>;
  create(data: CreateRequestData): Promise<RequestEntity>;
  approve(id: string): Promise<RequestEntity>;
  reject(id: string): Promise<RequestEntity>;
  cancel(id: string): Promise<RequestEntity>;
}
