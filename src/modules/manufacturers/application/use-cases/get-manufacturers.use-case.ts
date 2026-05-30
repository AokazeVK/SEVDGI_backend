import { Inject, Injectable } from '@nestjs/common';
import { MANUFACTURERS_REPOSITORY } from '../../domain/repositories/manufacturers.repository';
import type { ManufacturersRepository } from '../../domain/repositories/manufacturers.repository';

@Injectable()
export class GetManufacturersUseCase {
  constructor(
    @Inject(MANUFACTURERS_REPOSITORY)
    private readonly manufacturersRepository: ManufacturersRepository,
  ) {}

  execute() {
    return this.manufacturersRepository.findAll();
  }
}