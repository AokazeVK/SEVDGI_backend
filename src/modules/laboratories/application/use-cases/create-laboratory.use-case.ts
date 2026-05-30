import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateLaboratoryDto } from '../dto/create-laboratory.dto';
import { LABORATORIES_REPOSITORY } from '../../domain/repositories/laboratories.repository';
import type { LaboratoriesRepository } from '../../domain/repositories/laboratories.repository';

@Injectable()
export class CreateLaboratoryUseCase {
  constructor(
    @Inject(LABORATORIES_REPOSITORY)
    private readonly laboratoriesRepository: LaboratoriesRepository,
  ) {}

  async execute(dto: CreateLaboratoryDto) {
    if (dto.nit) {
      const nitExists = await this.laboratoriesRepository.findByNit(dto.nit);

      if (nitExists) {
        throw new BadRequestException('El NIT del laboratorio ya existe');
      }
    }

    return this.laboratoriesRepository.create(dto);
  }
}