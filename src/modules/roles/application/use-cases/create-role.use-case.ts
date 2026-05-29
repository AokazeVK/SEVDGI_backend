import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { ROLES_REPOSITORY } from '../../domain/repositories/roles.repository';
import type { RolesRepository } from '../../domain/repositories/roles.repository';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    @Inject(ROLES_REPOSITORY)
    private readonly rolesRepository: RolesRepository,
  ) {}

  async execute(dto: CreateRoleDto) {
    const exists = await this.rolesRepository.findByName(dto.name);

    if (exists) {
      throw new BadRequestException('El rol ya existe');
    }

    return this.rolesRepository.create(dto);
  }
}
