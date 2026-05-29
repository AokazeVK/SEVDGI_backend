import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'jhuayhua' })
  @IsString()
  username!: string;

  @ApiProperty({ example: 'joel@sistema.local' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'Joel Huayhua' })
  @IsString()
  fullName!: string;

  @ApiProperty({ example: 'Admin123*' })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiPropertyOptional({
    example: ['uuid-role-id'],
    description: 'Roles asignados al usuario',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roleIds?: string[];
}
