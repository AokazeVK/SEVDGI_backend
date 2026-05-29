import { Module } from '@nestjs/common';

import { ROLES_REPOSITORY } from './domain/repositories/roles.repository';
import { PrismaRolesRepository } from './infrastructure/repositories/prisma-roles.repository';

import { RolesController } from './infrastructure/controllers/roles.controller';

import { GetRolesUseCase } from './application/use-cases/get-roles.use-case';
import { GetRoleByIdUseCase } from './application/use-cases/get-role-by-id.use-case';
import { CreateRoleUseCase } from './application/use-cases/create-role.use-case';
import { UpdateRoleUseCase } from './application/use-cases/update-role.use-case';
import { ToggleRoleUseCase } from './application/use-cases/toggle-role.use-case';
import { AssignPermissionsToRoleUseCase } from './application/use-cases/assign-permissions-to-role.use-case';

@Module({
  controllers: [RolesController],
  providers: [
    GetRolesUseCase,
    GetRoleByIdUseCase,
    CreateRoleUseCase,
    UpdateRoleUseCase,
    ToggleRoleUseCase,
    AssignPermissionsToRoleUseCase,
    {
      provide: ROLES_REPOSITORY,
      useClass: PrismaRolesRepository,
    },
  ],
})
export class RolesModule {}
