import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSupplierDto } from '../dto/update-supplier.dto';
import { SUPPLIERS_REPOSITORY } from '../../domain/repositories/suppliers.repository';
import type { SuppliersRepository } from '../../domain/repositories/suppliers.repository';

@Injectable()
export class UpdateSupplierUseCase {
  constructor(
    @Inject(SUPPLIERS_REPOSITORY)
    private readonly suppliersRepository: SuppliersRepository,
  ) {}

  async execute(id: string, dto: UpdateSupplierDto) {
    const supplier = await this.suppliersRepository.findById(id);

    if (!supplier) {
      throw new NotFoundException('Proveedor no encontrado');
    }

    if (dto.nit && dto.nit !== supplier.nit) {
      const exists = await this.suppliersRepository.findByNit(dto.nit);

      if (exists) {
        throw new BadRequestException('El NIT del proveedor ya existe');
      }
    }

    return this.suppliersRepository.update(id, dto);
  }
}
