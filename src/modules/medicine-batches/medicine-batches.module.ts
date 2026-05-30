import { Module } from '@nestjs/common';

import { MEDICINE_BATCHES_REPOSITORY } from './domain/repositories/medicine-batches.repository';
import { PrismaMedicineBatchesRepository } from './infrastructure/repositories/prisma-medicine-batches.repository';

import { MedicineBatchesController } from './infrastructure/controllers/medicine-batches.controller';

import { GetMedicineBatchesUseCase } from './application/use-cases/get-medicine-batches.use-case';
import { GetMedicineBatchByIdUseCase } from './application/use-cases/get-medicine-batch-by-id.use-case';
import { CreateMedicineBatchUseCase } from './application/use-cases/create-medicine-batch.use-case';
import { UpdateMedicineBatchUseCase } from './application/use-cases/update-medicine-batch.use-case';
import { ToggleMedicineBatchUseCase } from './application/use-cases/toggle-medicine-batch.use-case';

@Module({
  controllers: [MedicineBatchesController],
  providers: [
    GetMedicineBatchesUseCase,
    GetMedicineBatchByIdUseCase,
    CreateMedicineBatchUseCase,
    UpdateMedicineBatchUseCase,
    ToggleMedicineBatchUseCase,
    {
      provide: MEDICINE_BATCHES_REPOSITORY,
      useClass: PrismaMedicineBatchesRepository,
    },
  ],
})
export class MedicineBatchesModule {}
