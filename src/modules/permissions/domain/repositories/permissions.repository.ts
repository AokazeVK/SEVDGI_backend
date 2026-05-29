import { PermissionEntity } from '../entities/permission.entity';

export const PERMISSIONS_REPOSITORY = Symbol('PERMISSIONS_REPOSITORY');

export interface PermissionsRepository {
  findAll(): Promise<PermissionEntity[]>;
}
