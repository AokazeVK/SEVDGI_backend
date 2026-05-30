import { Module } from '@nestjs/common';

import { SUPPLIERS_REPOSITORY } from './domain/repositories/suppliers.repository';
import { PrismaSuppliersRepository } from './infrastructure/repositories/prisma-suppliers.repository';

import { SuppliersController } from './infrastructure/controllers/suppliers.controller';

import { GetSuppliersUseCase } from './application/use-cases/get-suppliers.use-case';
import { GetSupplierByIdUseCase } from './application/use-cases/get-supplier-by-id.use-case';
import { CreateSupplierUseCase } from './application/use-cases/create-supplier.use-case';
import { UpdateSupplierUseCase } from './application/use-cases/update-supplier.use-case';
import { ToggleSupplierUseCase } from './application/use-cases/toggle-supplier.use-case';

@Module({
  controllers: [SuppliersController],
  providers: [
    GetSuppliersUseCase,
    GetSupplierByIdUseCase,
    CreateSupplierUseCase,
    UpdateSupplierUseCase,
    ToggleSupplierUseCase,
    {
      provide: SUPPLIERS_REPOSITORY,
      useClass: PrismaSuppliersRepository,
    },
  ],
})
export class SuppliersModule {}
