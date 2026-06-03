import { Module } from '@nestjs/common';

import { ALERTS_REPOSITORY } from './domain/repositories/alerts.repository';
import { PrismaAlertsRepository } from './infrastructure/repositories/prisma-alerts.repository';

import { AlertsController } from './infrastructure/controllers/alerts.controller';

import { GenerateAlertsUseCase } from './application/use-cases/generate-alerts.use-case';
import { GetAlertByIdUseCase } from './application/use-cases/get-alert-by-id.use-case';
import { GetAlertsUseCase } from './application/use-cases/get-alerts.use-case';
import { GetPendingAlertsUseCase } from './application/use-cases/get-pending-alerts.use-case';
import { MarkAlertAsReadUseCase } from './application/use-cases/mark-alert-as-read.use-case';
import { ResolveAlertUseCase } from './application/use-cases/resolve-alert.use-case';
import { AlertsSchedulerService } from './application/services/alerts-scheduler.service';
@Module({
  controllers: [AlertsController],
  providers: [
    AlertsSchedulerService,
    GetAlertsUseCase,
    GetPendingAlertsUseCase,
    GetAlertByIdUseCase,
    GenerateAlertsUseCase,
    MarkAlertAsReadUseCase,
    ResolveAlertUseCase,
    {
      provide: ALERTS_REPOSITORY,
      useClass: PrismaAlertsRepository,
    },
  ],
})
export class AlertsModule {}
