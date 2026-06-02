import { Module } from '@nestjs/common';

import { PHARMACY_DISPENSATIONS_REPOSITORY } from './domain/repositories/pharmacy-dispensations.repository';
import { PrismaPharmacyDispensationsRepository } from './infrastructure/repositories/prisma-pharmacy-dispensations.repository';

import { PharmacyDispensationsController } from './infrastructure/controllers/pharmacy-dispensations.controller';

import { CreatePharmacyDispensationUseCase } from './application/use-cases/create-pharmacy-dispensation.use-case';
import { GetPharmacyDispensationByIdUseCase } from './application/use-cases/get-pharmacy-dispensation-by-id.use-case';
import { GetPharmacyDispensationsUseCase } from './application/use-cases/get-pharmacy-dispensations.use-case';

@Module({
  controllers: [PharmacyDispensationsController],
  providers: [
    GetPharmacyDispensationsUseCase,
    GetPharmacyDispensationByIdUseCase,
    CreatePharmacyDispensationUseCase,
    {
      provide: PHARMACY_DISPENSATIONS_REPOSITORY,
      useClass: PrismaPharmacyDispensationsRepository,
    },
  ],
})
export class PharmacyDispensationsModule {}
