import { Module } from '@nestjs/common';

import { MEDICINES_REPOSITORY } from './domain/repositories/medicines.repository';
import { PrismaMedicinesRepository } from './infrastructure/repositories/prisma-medicines.repository';

import { MedicinesController } from './infrastructure/controllers/medicines.controller';

import { GetMedicinesUseCase } from './application/use-cases/get-medicines.use-case';
import { GetMedicineByIdUseCase } from './application/use-cases/get-medicine-by-id.use-case';
import { CreateMedicineUseCase } from './application/use-cases/create-medicine.use-case';
import { UpdateMedicineUseCase } from './application/use-cases/update-medicine.use-case';
import { ToggleMedicineUseCase } from './application/use-cases/toggle-medicine.use-case';

@Module({
  controllers: [MedicinesController],
  providers: [
    GetMedicinesUseCase,
    GetMedicineByIdUseCase,
    CreateMedicineUseCase,
    UpdateMedicineUseCase,
    ToggleMedicineUseCase,
    {
      provide: MEDICINES_REPOSITORY,
      useClass: PrismaMedicinesRepository,
    },
  ],
})
export class MedicinesModule {}
