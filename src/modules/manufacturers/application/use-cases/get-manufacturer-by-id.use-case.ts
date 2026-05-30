import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MANUFACTURERS_REPOSITORY } from '../../domain/repositories/manufacturers.repository';
import type { ManufacturersRepository } from '../../domain/repositories/manufacturers.repository';

@Injectable()
export class GetManufacturerByIdUseCase {
  constructor(
    @Inject(MANUFACTURERS_REPOSITORY)
    private readonly manufacturersRepository: ManufacturersRepository,
  ) {}

  async execute(id: string) {
    const manufacturer = await this.manufacturersRepository.findById(id);

    if (!manufacturer) {
      throw new NotFoundException('Fabricante no encontrado');
    }

    return manufacturer;
  }
}