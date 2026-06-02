import { Module } from '@nestjs/common';

import { SANITARY_REGISTRATIONS_REPOSITORY } from './domain/repositories/sanitary-registrations.repository';
import { PrismaSanitaryRegistrationsRepository } from './infrastructure/repositories/prisma-sanitary-registrations.repository';

import { SanitaryRegistrationsController } from './infrastructure/controllers/sanitary-registrations.controller';

import { CreateSanitaryRegistrationUseCase } from './application/use-cases/create-sanitary-registration.use-case';
import { GetSanitaryRegistrationByIdUseCase } from './application/use-cases/get-sanitary-registration-by-id.use-case';
import { GetSanitaryRegistrationsUseCase } from './application/use-cases/get-sanitary-registrations.use-case';
import { ToggleSanitaryRegistrationUseCase } from './application/use-cases/toggle-sanitary-registration.use-case';
import { UpdateSanitaryRegistrationUseCase } from './application/use-cases/update-sanitary-registration.use-case';

@Module({
  controllers: [SanitaryRegistrationsController],
  providers: [
    GetSanitaryRegistrationsUseCase,
    GetSanitaryRegistrationByIdUseCase,
    CreateSanitaryRegistrationUseCase,
    UpdateSanitaryRegistrationUseCase,
    ToggleSanitaryRegistrationUseCase,
    {
      provide: SANITARY_REGISTRATIONS_REPOSITORY,
      useClass: PrismaSanitaryRegistrationsRepository,
    },
  ],
})
export class SanitaryRegistrationsModule {}
