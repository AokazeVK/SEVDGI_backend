import { Module } from '@nestjs/common';

import { USERS_REPOSITORY } from './domain/repositories/users.repository';
import { PrismaUsersRepository } from './infrastructure/repositories/prisma-users.repository';

import { UsersController } from './infrastructure/controllers/users.controller';

import { GetUsersUseCase } from './application/use-cases/get-users.use-case';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.use-case';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { ToggleUserUseCase } from './application/use-cases/toggle-user.use-case';

@Module({
  controllers: [UsersController],
  providers: [
    GetUsersUseCase,
    GetUserByIdUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    ToggleUserUseCase,
    {
      provide: USERS_REPOSITORY,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UsersModule {}
