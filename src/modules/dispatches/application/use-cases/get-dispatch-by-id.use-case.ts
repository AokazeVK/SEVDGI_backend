import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { DISPATCHES_REPOSITORY } from '../../domain/repositories/dispatches.repository';
import type { DispatchesRepository } from '../../domain/repositories/dispatches.repository';

@Injectable()
export class GetDispatchByIdUseCase {
  constructor(
    @Inject(DISPATCHES_REPOSITORY)
    private readonly repository: DispatchesRepository,
  ) {}

  async execute(id: string) {
    const dispatch = await this.repository.findById(id);

    if (!dispatch) {
      throw new NotFoundException('Despacho no encontrado');
    }

    return dispatch;
  }
}
