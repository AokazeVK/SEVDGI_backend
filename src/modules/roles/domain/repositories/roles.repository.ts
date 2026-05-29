import { RoleEntity } from '../entities/role.entity';

export const ROLES_REPOSITORY = Symbol('ROLES_REPOSITORY');

export interface CreateRoleData {
  name: string;
  description?: string;
}

export interface UpdateRoleData {
  name?: string;
  description?: string;
}

export interface RolesRepository {
  findAll(): Promise<RoleEntity[]>;
  findById(id: string): Promise<RoleEntity | null>;
  findByName(name: string): Promise<RoleEntity | null>;
  create(data: CreateRoleData): Promise<RoleEntity>;
  update(id: string, data: UpdateRoleData): Promise<RoleEntity>;
  toggle(id: string): Promise<RoleEntity>;
  assignPermissions(
    roleId: string,
    permissionIds: string[],
  ): Promise<RoleEntity>;
}
