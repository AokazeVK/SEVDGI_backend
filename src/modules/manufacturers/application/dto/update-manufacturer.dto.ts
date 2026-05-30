import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateManufacturerDto {
  @ApiPropertyOptional({ example: 'Bayer' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Alemania' })
  @IsOptional()
  @IsString()
  country?: string;
}