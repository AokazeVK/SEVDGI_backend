import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateTherapeuticGroupDto } from '../dto/create-therapeutic-group.dto';
import { THERAPEUTIC_GROUPS_REPOSITORY } from '../../domain/repositories/therapeutic-groups.repository';
import type { TherapeuticGroupsRepository } from '../../domain/repositories/therapeutic-groups.repository';

@Injectable()
export class CreateTherapeuticGroupUseCase {
  constructor(
    @Inject(THERAPEUTIC_GROUPS_REPOSITORY)
    private readonly repository: TherapeuticGroupsRepository,
  ) {}

  async execute(dto: CreateTherapeuticGroupDto) {
    const exists = await this.repository.findByName(dto.name);

    if (exists) {
      throw new BadRequestException('El grupo terapéutico ya existe');
    }

    return this.repository.create(dto);
  }
}
