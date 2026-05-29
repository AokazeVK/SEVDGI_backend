import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AssignPermissionsDto } from '../dto/assign-permissions.dto';
import { ROLES_REPOSITORY } from '../../domain/repositories/roles.repository';
import type { RolesRepository } from '../../domain/repositories/roles.repository';

@Injectable()
export class AssignPermissionsToRoleUseCase {
  constructor(
    @Inject(ROLES_REPOSITORY)
    private readonly rolesRepository: RolesRepository,
  ) {}

  async execute(roleId: string, dto: AssignPermissionsDto) {
    const role = await this.rolesRepository.findById(roleId);

    if (!role) {
      throw new NotFoundException('Rol no encontrado');
    }

    return this.rolesRepository.assignPermissions(roleId, dto.permissionIds);
  }
}
