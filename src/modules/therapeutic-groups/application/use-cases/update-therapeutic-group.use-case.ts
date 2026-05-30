import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTherapeuticGroupDto } from '../dto/update-therapeutic-group.dto';
import { THERAPEUTIC_GROUPS_REPOSITORY } from '../../domain/repositories/therapeutic-groups.repository';
import type { TherapeuticGroupsRepository } from '../../domain/repositories/therapeutic-groups.repository';

@Injectable()
export class UpdateTherapeuticGroupUseCase {
  constructor(
    @Inject(THERAPEUTIC_GROUPS_REPOSITORY)
    private readonly repository: TherapeuticGroupsRepository,
  ) {}

  async execute(id: string, dto: UpdateTherapeuticGroupDto) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new NotFoundException('Grupo terapéutico no encontrado');
    }

    if (dto.name && dto.name !== item.name) {
      const exists = await this.repository.findByName(dto.name);

      if (exists) {
        throw new BadRequestException('El grupo terapéutico ya existe');
      }
    }

    return this.repository.update(id, dto);
  }
}
