import { Inject, Injectable } from '@nestjs/common';

import { CreateDispatchDto } from '../dto/create-dispatch.dto';
import { DISPATCHES_REPOSITORY } from '../../domain/repositories/dispatches.repository';
import type { DispatchesRepository } from '../../domain/repositories/dispatches.repository';

@Injectable()
export class CreateDispatchUseCase {
  constructor(
    @Inject(DISPATCHES_REPOSITORY)
    private readonly repository: DispatchesRepository,
  ) {}

  execute(dto: CreateDispatchDto) {
    return this.repository.create(dto);
  }
}
