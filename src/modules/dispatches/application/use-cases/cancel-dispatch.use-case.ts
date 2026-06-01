import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { DISPATCHES_REPOSITORY } from '../../domain/repositories/dispatches.repository';
import type { DispatchesRepository } from '../../domain/repositories/dispatches.repository';

@Injectable()
export class CancelDispatchUseCase {
  constructor(
    @Inject(DISPATCHES_REPOSITORY)
    private readonly repository: DispatchesRepository,
  ) {}

  async execute(id: string) {
    const dispatch = await this.repository.findById(id);

    if (!dispatch) {
      throw new NotFoundException('Despacho no encontrado');
    }

    if (dispatch.status === 'RECEIVED') {
      throw new BadRequestException('No se puede cancelar un despacho recibido');
    }

    if (dispatch.status === 'CANCELLED') {
      throw new BadRequestException('El despacho ya fue cancelado');
    }

    return this.repository.cancel(id);
  }
}
