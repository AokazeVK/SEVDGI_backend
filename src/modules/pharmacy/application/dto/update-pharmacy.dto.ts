import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePharmacyDto {
  @ApiPropertyOptional({ example: 'Farmacia Central' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Centro de Medicina Nuclear' })
  @IsOptional()
  @IsString()
  location?: string;
}
