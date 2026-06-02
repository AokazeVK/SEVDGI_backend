import { Module } from '@nestjs/common';

import { PRESCRIPTIONS_REPOSITORY } from './domain/repositories/prescriptions.repository';
import { PrismaPrescriptionsRepository } from './infrastructure/repositories/prisma-prescriptions.repository';

import { PrescriptionsController } from './infrastructure/controllers/prescriptions.controller';

import { CancelPrescriptionUseCase } from './application/use-cases/cancel-prescription.use-case';
import { CreatePrescriptionUseCase } from './application/use-cases/create-prescription.use-case';
import { GetPrescriptionByIdUseCase } from './application/use-cases/get-prescription-by-id.use-case';
import { GetPrescriptionsUseCase } from './application/use-cases/get-prescriptions.use-case';

@Module({
  controllers: [PrescriptionsController],
  providers: [
    GetPrescriptionsUseCase,
    GetPrescriptionByIdUseCase,
    CreatePrescriptionUseCase,
    CancelPrescriptionUseCase,
    {
      provide: PRESCRIPTIONS_REPOSITORY,
      useClass: PrismaPrescriptionsRepository,
    },
  ],
})
export class PrescriptionsModule {}
