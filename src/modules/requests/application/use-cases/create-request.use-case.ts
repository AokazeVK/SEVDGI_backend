import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CreateRequestDto } from '../dto/create-request.dto';
import { REQUESTS_REPOSITORY } from '../../domain/repositories/requests.repository';
import type { RequestsRepository } from '../../domain/repositories/requests.repository';

@Injectable()
export class CreateRequestUseCase {
  constructor(
    @Inject(REQUESTS_REPOSITORY)
    private readonly repository: RequestsRepository,
  ) {}

  async execute(dto: CreateRequestDto) {
    if (!dto.details || dto.details.length === 0) {
      throw new BadRequestException('La solicitud debe tener al menos un detalle');
    }

    return this.repository.create(dto);
  }
}
