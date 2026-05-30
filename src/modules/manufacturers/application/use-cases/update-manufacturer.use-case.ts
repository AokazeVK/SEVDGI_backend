import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateManufacturerDto } from '../dto/update-manufacturer.dto';
import { MANUFACTURERS_REPOSITORY } from '../../domain/repositories/manufacturers.repository';
import type { ManufacturersRepository } from '../../domain/repositories/manufacturers.repository';

@Injectable()
export class UpdateManufacturerUseCase {
  constructor(
    @Inject(MANUFACTURERS_REPOSITORY)
    private readonly manufacturersRepository: ManufacturersRepository,
  ) {}

  async execute(id: string, dto: UpdateManufacturerDto) {
    const manufacturer = await this.manufacturersRepository.findById(id);

    if (!manufacturer) {
      throw new NotFoundException('Fabricante no encontrado');
    }

    if (dto.name && dto.name !== manufacturer.name) {
      const exists = await this.manufacturersRepository.findByName(dto.name);

      if (exists) {
        throw new BadRequestException('El fabricante ya existe');
      }
    }

    return this.manufacturersRepository.update(id, dto);
  }
}