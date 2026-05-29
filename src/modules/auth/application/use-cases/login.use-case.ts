import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { AUTH_REPOSITORY } from '../../domain/repositories/auth.repository';
import type { AuthRepository } from '../../domain/repositories/auth.repository';

import { PASSWORD_HASHER } from '../../domain/services/password-hasher.service';
import type { PasswordHasher } from '../../domain/services/password-hasher.service';

import { TOKEN_SERVICE } from '../../domain/services/token.service';
import type { TokenService } from '../../domain/services/token.service';

import { LoginDto } from '../dto/login.dto';
import { AuthenticatedUser } from '../../domain/entities/authenticated-user.entity';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: AuthRepository,

    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: PasswordHasher,

    @Inject(TOKEN_SERVICE)
    private readonly tokenService: TokenService,
  ) {}

  async execute(dto: LoginDto) {
    const user = await this.authRepository.findActiveUserByUsernameOrEmail(
      dto.usernameOrEmail,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await this.passwordHasher.compare(
      dto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const authenticatedUser = new AuthenticatedUser(
      user.id,
      user.username,
      user.email,
      user.fullName,
      user.roles,
      user.permissions,
    );

    const accessToken = await this.tokenService.generateAccessToken({
      sub: authenticatedUser.id,
      username: authenticatedUser.username,
      roles: authenticatedUser.roles,
      permissions: authenticatedUser.permissions,
    });

    return {
      accessToken,
      user: authenticatedUser,
    };
  }
}
