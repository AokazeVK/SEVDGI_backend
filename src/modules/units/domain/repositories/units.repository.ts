import { UnitEntity } from '../entities/unit.entity';

export const UNITS_REPOSITORY = Symbol('UNITS_REPOSITORY');

export interface CreateUnitData {
  name: string;
  symbol: string;
}

export interface UpdateUnitData {
  name?: string;
  symbol?: string;
}

export interface UnitsRepository {
  findAll(): Promise<UnitEntity[]>;
  findById(id: string): Promise<UnitEntity | null>;
  findByName(name: string): Promise<UnitEntity | null>;
  findBySymbol(symbol: string): Promise<UnitEntity | null>;
  create(data: CreateUnitData): Promise<UnitEntity>;
  update(id: string, data: UpdateUnitData): Promise<UnitEntity>;
  toggle(id: string): Promise<UnitEntity>;
}
