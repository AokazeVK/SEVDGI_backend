import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { USERS_REPOSITORY } from '../../domain/repositories/users.repository';
import type { UsersRepository } from '../../domain/repositories/users.repository';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(id: string, dto: UpdateUserDto) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (dto.username && dto.username !== user.username) {
      const usernameExists = await this.usersRepository.findByUsername(
        dto.username,
      );
      if (usernameExists) {
        throw new BadRequestException('El nombre de usuario ya existe');
      }
    }

    if (dto.email && dto.email !== user.email) {
      const emailExists = await this.usersRepository.findByEmail(dto.email);
      if (emailExists) {
        throw new BadRequestException('El correo electrónico ya existe');
      }
    }

    return this.usersRepository.update(id, dto);
  }
}
