import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { REQUESTS_REPOSITORY } from '../../domain/repositories/requests.repository';
import type { RequestsRepository } from '../../domain/repositories/requests.repository';

@Injectable()
export class GetRequestByIdUseCase {
  constructor(
    @Inject(REQUESTS_REPOSITORY)
    private readonly repository: RequestsRepository,
  ) {}

  async execute(id: string) {
    const request = await this.repository.findById(id);

    if (!request) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    return request;
  }
}
