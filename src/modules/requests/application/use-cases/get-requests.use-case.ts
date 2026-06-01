import { Inject, Injectable } from '@nestjs/common';

import { REQUESTS_REPOSITORY } from '../../domain/repositories/requests.repository';
import type { RequestsRepository } from '../../domain/repositories/requests.repository';

@Injectable()
export class GetRequestsUseCase {
  constructor(
    @Inject(REQUESTS_REPOSITORY)
    private readonly repository: RequestsRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
