import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { ROLES_REPOSITORY } from '../../domain/repositories/roles.repository';
import type { RolesRepository } from '../../domain/repositories/roles.repository';

@Injectable()
export class UpdateRoleUseCase {
  constructor(
    @Inject(ROLES_REPOSITORY)
    private readonly rolesRepository: RolesRepository,
  ) {}

  async execute(id: string, dto: UpdateRoleDto) {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new NotFoundException('Rol no encontrado');
    }

    if (dto.name && dto.name !== role.name) {
      const exists = await this.rolesRepository.findByName(dto.name);

      if (exists) {
        throw new BadRequestException('El rol ya existe');
      }
    }

    return this.rolesRepository.update(id, dto);
  }
}
