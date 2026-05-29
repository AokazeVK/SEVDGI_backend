import { Inject, Injectable } from '@nestjs/common';
import { ROLES_REPOSITORY } from '../../domain/repositories/roles.repository';
import type { RolesRepository } from '../../domain/repositories/roles.repository';

@Injectable()
export class GetRolesUseCase {
  constructor(
    @Inject(ROLES_REPOSITORY)
    private readonly rolesRepository: RolesRepository,
  ) {}

  execute() {
    return this.rolesRepository.findAll();
  }
}
