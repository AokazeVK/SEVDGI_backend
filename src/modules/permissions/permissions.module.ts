import { Module } from '@nestjs/common';

import { PERMISSIONS_REPOSITORY } from './domain/repositories/permissions.repository';
import { PrismaPermissionsRepository } from './infrastructure/repositories/prisma-permissions.repository';
import { PermissionsController } from './infrastructure/controllers/permissions.controller';
import { GetPermissionsUseCase } from './application/use-cases/get-permissions.use-case';

@Module({
  controllers: [PermissionsController],
  providers: [
    GetPermissionsUseCase,
    {
      provide: PERMISSIONS_REPOSITORY,
      useClass: PrismaPermissionsRepository,
    },
  ],
})
export class PermissionsModule {}
