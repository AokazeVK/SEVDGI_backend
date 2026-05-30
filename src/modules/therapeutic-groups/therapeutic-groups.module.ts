import { Module } from '@nestjs/common';

import { THERAPEUTIC_GROUPS_REPOSITORY } from './domain/repositories/therapeutic-groups.repository';
import { PrismaTherapeuticGroupsRepository } from './infrastructure/repositories/prisma-therapeutic-groups.repository';

import { TherapeuticGroupsController } from './infrastructure/controllers/therapeutic-groups.controller';

import { GetTherapeuticGroupsUseCase } from './application/use-cases/get-therapeutic-groups.use-case';
import { GetTherapeuticGroupByIdUseCase } from './application/use-cases/get-therapeutic-group-by-id.use-case';
import { CreateTherapeuticGroupUseCase } from './application/use-cases/create-therapeutic-group.use-case';
import { UpdateTherapeuticGroupUseCase } from './application/use-cases/update-therapeutic-group.use-case';
import { ToggleTherapeuticGroupUseCase } from './application/use-cases/toggle-therapeutic-group.use-case';

@Module({
  controllers: [TherapeuticGroupsController],
  providers: [
    GetTherapeuticGroupsUseCase,
    GetTherapeuticGroupByIdUseCase,
    CreateTherapeuticGroupUseCase,
    UpdateTherapeuticGroupUseCase,
    ToggleTherapeuticGroupUseCase,
    {
      provide: THERAPEUTIC_GROUPS_REPOSITORY,
      useClass: PrismaTherapeuticGroupsRepository,
    },
  ],
})
export class TherapeuticGroupsModule {}
