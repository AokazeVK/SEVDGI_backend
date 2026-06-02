import { Module } from '@nestjs/common';

import { PATIENTS_REPOSITORY } from './domain/repositories/patients.repository';
import { PrismaPatientsRepository } from './infrastructure/repositories/prisma-patients.repository';

import { PatientsController } from './infrastructure/controllers/patients.controller';

import { CreatePatientUseCase } from './application/use-cases/create-patient.use-case';
import { GetPatientByIdUseCase } from './application/use-cases/get-patient-by-id.use-case';
import { GetPatientsUseCase } from './application/use-cases/get-patients.use-case';
import { TogglePatientUseCase } from './application/use-cases/toggle-patient.use-case';
import { UpdatePatientUseCase } from './application/use-cases/update-patient.use-case';

@Module({
  controllers: [PatientsController],
  providers: [
    GetPatientsUseCase,
    GetPatientByIdUseCase,
    CreatePatientUseCase,
    UpdatePatientUseCase,
    TogglePatientUseCase,
    {
      provide: PATIENTS_REPOSITORY,
      useClass: PrismaPatientsRepository,
    },
  ],
})
export class PatientsModule {}
