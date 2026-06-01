import { Module } from '@nestjs/common';

import { DISPATCHES_REPOSITORY } from './domain/repositories/dispatches.repository';
import { PrismaDispatchesRepository } from './infrastructure/repositories/prisma-dispatches.repository';

import { DispatchesController } from './infrastructure/controllers/dispatches.controller';

import { CancelDispatchUseCase } from './application/use-cases/cancel-dispatch.use-case';
import { CreateDispatchUseCase } from './application/use-cases/create-dispatch.use-case';
import { GetDispatchByIdUseCase } from './application/use-cases/get-dispatch-by-id.use-case';
import { GetDispatchesUseCase } from './application/use-cases/get-dispatches.use-case';

@Module({
  controllers: [DispatchesController],
  providers: [
    GetDispatchesUseCase,
    GetDispatchByIdUseCase,
    CreateDispatchUseCase,
    CancelDispatchUseCase,
    {
      provide: DISPATCHES_REPOSITORY,
      useClass: PrismaDispatchesRepository,
    },
  ],
})
export class DispatchesModule {}
