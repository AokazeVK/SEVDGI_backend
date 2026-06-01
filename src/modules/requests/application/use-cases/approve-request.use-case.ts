import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { REQUESTS_REPOSITORY } from '../../domain/repositories/requests.repository';
import type { RequestsRepository } from '../../domain/repositories/requests.repository';

@Injectable()
export class ApproveRequestUseCase {
  constructor(
    @Inject(REQUESTS_REPOSITORY)
    private readonly repository: RequestsRepository,
  ) {}

  async execute(id: string) {
    const request = await this.repository.findById(id);

    if (!request) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    if (request.status !== 'PENDING') {
      throw new BadRequestException('Solo se pueden aprobar solicitudes pendientes');
    }

    return this.repository.approve(id);
  }
}
