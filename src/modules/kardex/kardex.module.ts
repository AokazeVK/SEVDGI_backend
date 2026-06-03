import { Module } from '@nestjs/common';

import { KARDEX_REPOSITORY } from './domain/repositories/kardex.repository';
import { PrismaKardexRepository } from './infrastructure/repositories/prisma-kardex.repository';

import { KardexController } from './infrastructure/controllers/kardex.controller';

import { GetKardexByIdUseCase } from './application/use-cases/get-kardex-by-id.use-case';
import { GetKardexByMedicineUseCase } from './application/use-cases/get-kardex-by-medicine.use-case';
import { GetKardexByPharmacyUseCase } from './application/use-cases/get-kardex-by-pharmacy.use-case';
import { GetKardexByWarehouseUseCase } from './application/use-cases/get-kardex-by-warehouse.use-case';
import { GetKardexUseCase } from './application/use-cases/get-kardex.use-case';

@Module({
  controllers: [KardexController],
  providers: [
    GetKardexUseCase,
    GetKardexByIdUseCase,
    GetKardexByMedicineUseCase,
    GetKardexByWarehouseUseCase,
    GetKardexByPharmacyUseCase,
    {
      provide: KARDEX_REPOSITORY,
      useClass: PrismaKardexRepository,
    },
  ],
})
export class KardexModule {}
