import { TherapeuticGroupEntity } from '../entities/therapeutic-group.entity';

export const THERAPEUTIC_GROUPS_REPOSITORY = Symbol('THERAPEUTIC_GROUPS_REPOSITORY');

export interface CreateTherapeuticGroupData {
  name: string;
  description?: string;
}

export interface UpdateTherapeuticGroupData {
  name?: string;
  description?: string;
}

export interface TherapeuticGroupsRepository {
  findAll(): Promise<TherapeuticGroupEntity[]>;
  findById(id: string): Promise<TherapeuticGroupEntity | null>;
  findByName(name: string): Promise<TherapeuticGroupEntity | null>;
  create(data: CreateTherapeuticGroupData): Promise<TherapeuticGroupEntity>;
  update(id: string, data: UpdateTherapeuticGroupData): Promise<TherapeuticGroupEntity>;
  toggle(id: string): Promise<TherapeuticGroupEntity>;
}
