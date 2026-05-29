import { Inject, Injectable } from '@nestjs/common';
import { PERMISSIONS_REPOSITORY } from '../../domain/repositories/permissions.repository';
import type { PermissionsRepository } from '../../domain/repositories/permissions.repository';

@Injectable()
export class GetPermissionsUseCase {
  constructor(
    @Inject(PERMISSIONS_REPOSITORY)
    private readonly permissionsRepository: PermissionsRepository,
  ) {}

  execute() {
    return this.permissionsRepository.findAll();
  }
}
