import { Inject, Injectable } from '@nestjs/common';

import { ALERTS_REPOSITORY } from '../../domain/repositories/alerts.repository';
import type { AlertsRepository } from '../../domain/repositories/alerts.repository';

@Injectable()
export class GetAlertsUseCase {
  constructor(
    @Inject(ALERTS_REPOSITORY)
    private readonly repository: AlertsRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
