import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SUPPLIERS_REPOSITORY } from '../../domain/repositories/suppliers.repository';
import type { SuppliersRepository } from '../../domain/repositories/suppliers.repository';

@Injectable()
export class ToggleSupplierUseCase {
  constructor(
    @Inject(SUPPLIERS_REPOSITORY)
    private readonly suppliersRepository: SuppliersRepository,
  ) {}

  async execute(id: string) {
    const supplier = await this.suppliersRepository.findById(id);

    if (!supplier) {
      throw new NotFoundException('Proveedor no encontrado');
    }

    return this.suppliersRepository.toggle(id);
  }
}
