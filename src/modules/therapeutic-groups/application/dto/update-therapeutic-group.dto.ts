import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTherapeuticGroupDto {
  @ApiPropertyOptional({ example: 'Analgésicos' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Medicamentos para aliviar el dolor',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
