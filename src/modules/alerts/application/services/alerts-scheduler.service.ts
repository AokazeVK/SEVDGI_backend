import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { ALERTS_REPOSITORY } from '../../domain/repositories/alerts.repository';
import type { AlertsRepository } from '../../domain/repositories/alerts.repository';

@Injectable()
export class AlertsSchedulerService {
  private readonly logger = new Logger(AlertsSchedulerService.name);

  constructor(
    @Inject(ALERTS_REPOSITORY)
    private readonly repository: AlertsRepository,
  ) {}

  @Cron('0 0 0 * * *')
  async handleAlertsGeneration() {
    this.logger.log('Probando scheduler de alertas...');

    const alerts = await this.repository.generate();

    this.logger.log(`Alertas automáticas generadas: ${alerts.length}`);
  }
}
