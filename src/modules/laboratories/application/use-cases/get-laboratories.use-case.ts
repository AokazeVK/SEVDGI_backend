import { Inject, Injectable } from '@nestjs/common';
import { LABORATORIES_REPOSITORY } from '../../domain/repositories/laboratories.repository';
import type { LaboratoriesRepository } from '../../domain/repositories/laboratories.repository';

@Injectable()
export class GetLaboratoriesUseCase {
  constructor(
    @Inject(LABORATORIES_REPOSITORY)
    private readonly laboratoriesRepository: LaboratoriesRepository,
  ) {}

  execute() {
    return this.laboratoriesRepository.findAll();
  }
}