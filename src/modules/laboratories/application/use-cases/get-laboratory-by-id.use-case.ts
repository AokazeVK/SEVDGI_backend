import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LABORATORIES_REPOSITORY } from '../../domain/repositories/laboratories.repository';
import type { LaboratoriesRepository } from '../../domain/repositories/laboratories.repository';

@Injectable()
export class GetLaboratoryByIdUseCase {
  constructor(
    @Inject(LABORATORIES_REPOSITORY)
    private readonly laboratoriesRepository: LaboratoriesRepository,
  ) {}

  async execute(id: string) {
    const laboratory = await this.laboratoriesRepository.findById(id);

    if (!laboratory) {
      throw new NotFoundException('Laboratorio no encontrado');
    }

    return laboratory;
  }
}