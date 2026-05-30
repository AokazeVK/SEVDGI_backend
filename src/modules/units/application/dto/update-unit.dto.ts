import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUnitDto {
  @ApiPropertyOptional({ example: 'Miligramo' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'mg' })
  @IsOptional()
  @IsString()
  symbol?: string;
}
