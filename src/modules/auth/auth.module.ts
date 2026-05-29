import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';

import { LoginUseCase } from './application/use-cases/login.use-case';
import { AuthController } from './infrastructure/controllers/auth.controller';

import { AUTH_REPOSITORY } from './domain/repositories/auth.repository';
import { PASSWORD_HASHER } from './domain/services/password-hasher.service';
import { TOKEN_SERVICE } from './domain/services/token.service';

import { PrismaAuthRepository } from './infrastructure/repositories/prisma-auth.repository';
import { BcryptPasswordHasher } from './infrastructure/services/bcrypt-password-hasher.service';
import { JwtTokenService } from './infrastructure/services/jwt-token.service';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_SECRET');

        if (!secret) {
          throw new Error('JWT_SECRET no está definido en .env');
        }

        const expiresIn =
          (config.get<string>('JWT_EXPIRES_IN') as StringValue) ?? '1d';

        return {
          secret,
          signOptions: {
            expiresIn,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    JwtStrategy,
    {
      provide: AUTH_REPOSITORY,
      useClass: PrismaAuthRepository,
    },
    {
      provide: PASSWORD_HASHER,
      useClass: BcryptPasswordHasher,
    },
    {
      provide: TOKEN_SERVICE,
      useClass: JwtTokenService,
    },
  ],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
