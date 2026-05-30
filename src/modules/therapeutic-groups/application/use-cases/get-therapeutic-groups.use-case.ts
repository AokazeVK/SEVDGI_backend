import { Inject, Injectable } from '@nestjs/common';
import { THERAPEUTIC_GROUPS_REPOSITORY } from '../../domain/repositories/therapeutic-groups.repository';
import type { TherapeuticGroupsRepository } from '../../domain/repositories/therapeutic-groups.repository';

@Injectable()
export class GetTherapeuticGroupsUseCase {
  constructor(
    @Inject(THERAPEUTIC_GROUPS_REPOSITORY)
    private readonly repository: TherapeuticGroupsRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
