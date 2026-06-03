import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { KARDEX_REPOSITORY } from '../../domain/repositories/kardex.repository';
import type { KardexRepository } from '../../domain/repositories/kardex.repository';

@Injectable()
export class GetKardexByIdUseCase {
  constructor(
    @Inject(KARDEX_REPOSITORY)
    private readonly repository: KardexRepository,
  ) {}

  async execute(id: string) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new NotFoundException('Registro de kardex no encontrado');
    }

    return item;
  }
}
