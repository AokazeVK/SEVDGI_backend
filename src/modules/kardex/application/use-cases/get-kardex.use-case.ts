import { Inject, Injectable } from '@nestjs/common';

import { KARDEX_REPOSITORY } from '../../domain/repositories/kardex.repository';
import type { KardexRepository } from '../../domain/repositories/kardex.repository';

@Injectable()
export class GetKardexUseCase {
  constructor(
    @Inject(KARDEX_REPOSITORY)
    private readonly repository: KardexRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
