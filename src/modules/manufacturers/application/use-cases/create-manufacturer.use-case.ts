import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateManufacturerDto } from '../dto/create-manufacturer.dto';
import { MANUFACTURERS_REPOSITORY } from '../../domain/repositories/manufacturers.repository';
import type { ManufacturersRepository } from '../../domain/repositories/manufacturers.repository';

@Injectable()
export class CreateManufacturerUseCase {
  constructor(
    @Inject(MANUFACTURERS_REPOSITORY)
    private readonly manufacturersRepository: ManufacturersRepository,
  ) {}

  async execute(dto: CreateManufacturerDto) {
    const exists = await this.manufacturersRepository.findByName(dto.name);

    if (exists) {
      throw new BadRequestException('El fabricante ya existe');
    }

    return this.manufacturersRepository.create(dto);
  }
}