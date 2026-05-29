import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'admin',
    description: 'Usuario o correo electrónico',
  })
  @IsString()
  usernameOrEmail!: string;

  @ApiProperty({
    example: 'Admin123*',
  })
  @IsString()
  @MinLength(6)
  password!: string;
}
