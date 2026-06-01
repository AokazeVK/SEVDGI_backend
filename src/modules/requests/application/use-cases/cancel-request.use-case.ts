import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { REQUESTS_REPOSITORY } from '../../domain/repositories/requests.repository';
import type { RequestsRepository } from '../../domain/repositories/requests.repository';

@Injectable()
export class CancelRequestUseCase {
  constructor(
    @Inject(REQUESTS_REPOSITORY)
    private readonly repository: RequestsRepository,
  ) {}

  async execute(id: string) {
    const request = await this.repository.findById(id);

    if (!request) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    if (!['PENDING', 'APPROVED'].includes(request.status)) {
      throw new BadRequestException('La solicitud no puede ser cancelada');
    }

    return this.repository.cancel(id);
  }
}
