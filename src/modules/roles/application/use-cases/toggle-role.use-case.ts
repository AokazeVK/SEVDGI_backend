import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ROLES_REPOSITORY } from '../../domain/repositories/roles.repository';
import type { RolesRepository } from '../../domain/repositories/roles.repository';

@Injectable()
export class ToggleRoleUseCase {
  constructor(
    @Inject(ROLES_REPOSITORY)
    private readonly rolesRepository: RolesRepository,
  ) {}

  async execute(id: string) {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new NotFoundException('Rol no encontrado');
    }

    return this.rolesRepository.toggle(id);
  }
}
