import { Inject, Injectable } from '@nestjs/common';

import { DOCTORS_REPOSITORY } from '../../domain/repositories/doctors.repository';
import type { DoctorsRepository } from '../../domain/repositories/doctors.repository';

@Injectable()
export class GetDoctorsUseCase {
  constructor(
    @Inject(DOCTORS_REPOSITORY)
    private readonly repository: DoctorsRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
