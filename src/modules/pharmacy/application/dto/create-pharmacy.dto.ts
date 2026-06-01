import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreatePharmacyDto {
  @ApiProperty({ example: 'Farmacia Central' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({ example: 'Centro de Medicina Nuclear' })
  @IsOptional()
  @IsString()
  location?: string;
}
