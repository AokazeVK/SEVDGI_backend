import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreatePatientDto {
  @ApiPropertyOptional({ example: '12345678' })
  @IsOptional()
  @IsString()
  ci?: string;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  fullName!: string;

  @ApiPropertyOptional({ example: '1990-05-20' })
  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @ApiPropertyOptional({ example: '77777777' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'La Paz' })
  @IsOptional()
  @IsString()
  address?: string;
}
