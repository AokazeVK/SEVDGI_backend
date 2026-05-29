import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USERS_REPOSITORY } from '../../domain/repositories/users.repository';
import type { UsersRepository } from '../../domain/repositories/users.repository';

@Injectable()
export class ToggleUserUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return this.usersRepository.toggle(id);
  }
}
