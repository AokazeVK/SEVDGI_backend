import { AlertEntity } from '../entities/alert.entity';

export const ALERTS_REPOSITORY = Symbol('ALERTS_REPOSITORY');

export interface AlertsRepository {
  findAll(): Promise<AlertEntity[]>;
  findPending(): Promise<AlertEntity[]>;
  findById(id: string): Promise<AlertEntity | null>;

  markAsRead(id: string): Promise<AlertEntity>;
  resolve(id: string): Promise<AlertEntity>;

  generate(): Promise<AlertEntity[]>;
}
