import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { USERS_REPOSITORY } from '../../domain/repositories/users.repository';
import type { UsersRepository } from '../../domain/repositories/users.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(dto: CreateUserDto) {
    const usernameExists = await this.usersRepository.findByUsername(
      dto.username,
    );
    if (usernameExists) {
      throw new BadRequestException('El nombre de usuario ya existe');
    }

    const emailExists = await this.usersRepository.findByEmail(dto.email);
    if (emailExists) {
      throw new BadRequestException('El correo electrónico ya existe');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    return this.usersRepository.create({
      username: dto.username,
      email: dto.email,
      fullName: dto.fullName,
      passwordHash,
      roleIds: dto.roleIds,
    });
  }
}
