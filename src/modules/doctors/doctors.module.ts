import { Module } from '@nestjs/common';

import { DOCTORS_REPOSITORY } from './domain/repositories/doctors.repository';
import { PrismaDoctorsRepository } from './infrastructure/repositories/prisma-doctors.repository';

import { DoctorsController } from './infrastructure/controllers/doctors.controller';

import { CreateDoctorUseCase } from './application/use-cases/create-doctor.use-case';
import { GetDoctorByIdUseCase } from './application/use-cases/get-doctor-by-id.use-case';
import { GetDoctorsUseCase } from './application/use-cases/get-doctors.use-case';
import { ToggleDoctorUseCase } from './application/use-cases/toggle-doctor.use-case';
import { UpdateDoctorUseCase } from './application/use-cases/update-doctor.use-case';

@Module({
  controllers: [DoctorsController],
  providers: [
    GetDoctorsUseCase,
    GetDoctorByIdUseCase,
    CreateDoctorUseCase,
    UpdateDoctorUseCase,
    ToggleDoctorUseCase,
    {
      provide: DOCTORS_REPOSITORY,
      useClass: PrismaDoctorsRepository,
    },
  ],
})
export class DoctorsModule {}
