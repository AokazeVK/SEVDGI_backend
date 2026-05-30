import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { SUPPLIERS_REPOSITORY } from '../../domain/repositories/suppliers.repository';
import type { SuppliersRepository } from '../../domain/repositories/suppliers.repository';

@Injectable()
export class CreateSupplierUseCase {
  constructor(
    @Inject(SUPPLIERS_REPOSITORY)
    private readonly suppliersRepository: SuppliersRepository,
  ) {}

  async execute(dto: CreateSupplierDto) {
    if (dto.nit) {
      const exists = await this.suppliersRepository.findByNit(dto.nit);

      if (exists) {
        throw new BadRequestException('El NIT del proveedor ya existe');
      }
    }

    return this.suppliersRepository.create(dto);
  }
}
