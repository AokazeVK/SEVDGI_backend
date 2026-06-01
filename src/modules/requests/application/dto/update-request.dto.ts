import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRequestDto {
  @ApiPropertyOptional({ example: 'Observación actualizada' })
  @IsOptional()
  @IsString()
  observation?: string;
}
