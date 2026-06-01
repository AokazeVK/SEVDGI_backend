import { Module } from '@nestjs/common';

import { REQUESTS_REPOSITORY } from './domain/repositories/requests.repository';
import { PrismaRequestsRepository } from './infrastructure/repositories/prisma-requests.repository';

import { RequestsController } from './infrastructure/controllers/requests.controller';

import { ApproveRequestUseCase } from './application/use-cases/approve-request.use-case';
import { CancelRequestUseCase } from './application/use-cases/cancel-request.use-case';
import { CreateRequestUseCase } from './application/use-cases/create-request.use-case';
import { GetRequestByIdUseCase } from './application/use-cases/get-request-by-id.use-case';
import { GetRequestsUseCase } from './application/use-cases/get-requests.use-case';
import { RejectRequestUseCase } from './application/use-cases/reject-request.use-case';

@Module({
  controllers: [RequestsController],
  providers: [
    GetRequestsUseCase,
    GetRequestByIdUseCase,
    CreateRequestUseCase,
    ApproveRequestUseCase,
    RejectRequestUseCase,
    CancelRequestUseCase,
    {
      provide: REQUESTS_REPOSITORY,
      useClass: PrismaRequestsRepository,
    },
  ],
})
export class RequestsModule {}
