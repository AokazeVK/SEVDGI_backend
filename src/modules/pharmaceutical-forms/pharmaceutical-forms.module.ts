import { Module } from '@nestjs/common';

import { PHARMACEUTICAL_FORMS_REPOSITORY } from './domain/repositories/pharmaceutical-forms.repository';
import { PrismaPharmaceuticalFormsRepository } from './infrastructure/repositories/prisma-pharmaceutical-forms.repository';

import { PharmaceuticalFormsController } from './infrastructure/controllers/pharmaceutical-forms.controller';

import { GetPharmaceuticalFormsUseCase } from './application/use-cases/get-pharmaceutical-forms.use-case';
import { GetPharmaceuticalFormByIdUseCase } from './application/use-cases/get-pharmaceutical-form-by-id.use-case';
import { CreatePharmaceuticalFormUseCase } from './application/use-cases/create-pharmaceutical-form.use-case';
import { UpdatePharmaceuticalFormUseCase } from './application/use-cases/update-pharmaceutical-form.use-case';
import { TogglePharmaceuticalFormUseCase } from './application/use-cases/toggle-pharmaceutical-form.use-case';

@Module({
  controllers: [PharmaceuticalFormsController],
  providers: [
    GetPharmaceuticalFormsUseCase,
    GetPharmaceuticalFormByIdUseCase,
    CreatePharmaceuticalFormUseCase,
    UpdatePharmaceuticalFormUseCase,
    TogglePharmaceuticalFormUseCase,
    {
      provide: PHARMACEUTICAL_FORMS_REPOSITORY,
      useClass: PrismaPharmaceuticalFormsRepository,
    },
  ],
})
export class PharmaceuticalFormsModule {}
