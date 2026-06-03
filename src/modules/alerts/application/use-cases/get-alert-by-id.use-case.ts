import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { ALERTS_REPOSITORY } from '../../domain/repositories/alerts.repository';
import type { AlertsRepository } from '../../domain/repositories/alerts.repository';

@Injectable()
export class GetAlertByIdUseCase {
  constructor(
    @Inject(ALERTS_REPOSITORY)
    private readonly repository: AlertsRepository,
  ) {}

  async execute(id: string) {
    const alert = await this.repository.findById(id);

    if (!alert) {
      throw new NotFoundException('Alerta no encontrada');
    }

    return alert;
  }
}
