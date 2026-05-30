import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { THERAPEUTIC_GROUPS_REPOSITORY } from '../../domain/repositories/therapeutic-groups.repository';
import type { TherapeuticGroupsRepository } from '../../domain/repositories/therapeutic-groups.repository';

@Injectable()
export class ToggleTherapeuticGroupUseCase {
  constructor(
    @Inject(THERAPEUTIC_GROUPS_REPOSITORY)
    private readonly repository: TherapeuticGroupsRepository,
  ) {}

  async execute(id: string) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new NotFoundException('Grupo terapéutico no encontrado');
    }

    return this.repository.toggle(id);
  }
}
