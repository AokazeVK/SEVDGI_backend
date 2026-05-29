import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from '../../domain/repositories/users.repository';
import type { UsersRepository } from '../../domain/repositories/users.repository';

@Injectable()
export class GetUsersUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  execute() {
    return this.usersRepository.findAll();
  }
}
