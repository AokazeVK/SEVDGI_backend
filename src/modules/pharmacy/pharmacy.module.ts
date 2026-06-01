import { Module } from '@nestjs/common';

import { PHARMACY_REPOSITORY } from './domain/repositories/pharmacy.repository';
import { PrismaPharmacyRepository } from './infrastructure/repositories/prisma-pharmacy.repository';

import { PharmacyController } from './infrastructure/controllers/pharmacy.controller';

import { CreatePharmacyUseCase } from './application/use-cases/create-pharmacy.use-case';
import { GetPharmacyByIdUseCase } from './application/use-cases/get-pharmacy-by-id.use-case';
import { GetPharmacyUseCase } from './application/use-cases/get-pharmacy.use-case';
import { TogglePharmacyUseCase } from './application/use-cases/toggle-pharmacy.use-case';
import { UpdatePharmacyUseCase } from './application/use-cases/update-pharmacy.use-case';

@Module({
  controllers: [PharmacyController],
  providers: [
    GetPharmacyUseCase,
    GetPharmacyByIdUseCase,
    CreatePharmacyUseCase,
    UpdatePharmacyUseCase,
    TogglePharmacyUseCase,
    {
      provide: PHARMACY_REPOSITORY,
      useClass: PrismaPharmacyRepository,
    },
  ],
})
export class PharmacyModule {}
