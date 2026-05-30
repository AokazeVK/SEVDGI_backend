import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateManufacturerDto {
  @ApiProperty({ example: 'Bayer' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({ example: 'Alemania' })
  @IsOptional()
  @IsString()
  country?: string;
}