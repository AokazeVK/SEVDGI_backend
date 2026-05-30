import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateLaboratoryDto {
  @ApiPropertyOptional({ example: '1020304012' })
  @IsOptional()
  @IsString()
  nit?: string;

  @ApiProperty({ example: 'Laboratorios INTI' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({ example: 'Bolivia' })
  @IsOptional()
  @IsString()
  country?: string;
}