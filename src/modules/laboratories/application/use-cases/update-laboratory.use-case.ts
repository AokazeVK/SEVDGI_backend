import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateLaboratoryDto } from '../dto/update-laboratory.dto';
import { LABORATORIES_REPOSITORY } from '../../domain/repositories/laboratories.repository';
import type { LaboratoriesRepository } from '../../domain/repositories/laboratories.repository';

@Injectable()
export class UpdateLaboratoryUseCase {
  constructor(
    @Inject(LABORATORIES_REPOSITORY)
    private readonly laboratoriesRepository: LaboratoriesRepository,
  ) {}

  async execute(id: string, dto: UpdateLaboratoryDto) {
    const laboratory = await this.laboratoriesRepository.findById(id);

    if (!laboratory) {
      throw new NotFoundException('Laboratorio no encontrado');
    }

    if (dto.nit && dto.nit !== laboratory.nit) {
      const nitExists = await this.laboratoriesRepository.findByNit(dto.nit);

      if (nitExists) {
        throw new BadRequestException('El NIT del laboratorio ya existe');
      }
    }

    return this.laboratoriesRepository.update(id, dto);
  }
}