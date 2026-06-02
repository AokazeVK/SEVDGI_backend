import { Module } from '@nestjs/common';

import { MEDICAL_SERVICES_REPOSITORY } from './domain/repositories/medical-services.repository';
import { PrismaMedicalServicesRepository } from './infrastructure/repositories/prisma-medical-services.repository';

import { MedicalServicesController } from './infrastructure/controllers/medical-services.controller';

import { CreateMedicalServiceUseCase } from './application/use-cases/create-medical-service.use-case';
import { GetMedicalServiceByIdUseCase } from './application/use-cases/get-medical-service-by-id.use-case';
import { GetMedicalServicesUseCase } from './application/use-cases/get-medical-services.use-case';
import { ToggleMedicalServiceUseCase } from './application/use-cases/toggle-medical-service.use-case';
import { UpdateMedicalServiceUseCase } from './application/use-cases/update-medical-service.use-case';

@Module({
  controllers: [MedicalServicesController],
  providers: [
    GetMedicalServicesUseCase,
    GetMedicalServiceByIdUseCase,
    CreateMedicalServiceUseCase,
    UpdateMedicalServiceUseCase,
    ToggleMedicalServiceUseCase,
    {
      provide: MEDICAL_SERVICES_REPOSITORY,
      useClass: PrismaMedicalServicesRepository,
    },
  ],
})
export class MedicalServicesModule {}
