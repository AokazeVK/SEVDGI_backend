import { Inject, Injectable } from '@nestjs/common';
import { SUPPLIERS_REPOSITORY } from '../../domain/repositories/suppliers.repository';
import type { SuppliersRepository } from '../../domain/repositories/suppliers.repository';

@Injectable()
export class GetSuppliersUseCase {
  constructor(
    @Inject(SUPPLIERS_REPOSITORY)
    private readonly suppliersRepository: SuppliersRepository,
  ) {}

  execute() {
    return this.suppliersRepository.findAll();
  }
}
