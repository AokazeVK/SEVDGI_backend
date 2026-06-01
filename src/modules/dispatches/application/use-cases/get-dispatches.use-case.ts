import { Inject, Injectable } from '@nestjs/common';

import { DISPATCHES_REPOSITORY } from '../../domain/repositories/dispatches.repository';
import type { DispatchesRepository } from '../../domain/repositories/dispatches.repository';

@Injectable()
export class GetDispatchesUseCase {
  constructor(
    @Inject(DISPATCHES_REPOSITORY)
    private readonly repository: DispatchesRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
