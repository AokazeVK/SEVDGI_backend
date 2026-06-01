import { Module } from '@nestjs/common';

import { PHARMACY_RECEPTIONS_REPOSITORY } from './domain/repositories/pharmacy-receptions.repository';
import { PrismaPharmacyReceptionsRepository } from './infrastructure/repositories/prisma-pharmacy-receptions.repository';

import { PharmacyReceptionsController } from './infrastructure/controllers/pharmacy-receptions.controller';

import { CreatePharmacyReceptionUseCase } from './application/use-cases/create-pharmacy-reception.use-case';
import { GetPharmacyReceptionByIdUseCase } from './application/use-cases/get-pharmacy-reception-by-id.use-case';
import { GetPharmacyReceptionsUseCase } from './application/use-cases/get-pharmacy-receptions.use-case';

@Module({
  controllers: [PharmacyReceptionsController],
  providers: [
    GetPharmacyReceptionsUseCase,
    GetPharmacyReceptionByIdUseCase,
    CreatePharmacyReceptionUseCase,
    {
      provide: PHARMACY_RECEPTIONS_REPOSITORY,
      useClass: PrismaPharmacyReceptionsRepository,
    },
  ],
})
export class PharmacyReceptionsModule {}
