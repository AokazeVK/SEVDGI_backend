import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMedicalServiceDto {
  @ApiPropertyOptional({
    example: 'Oncología',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Servicio médico de oncología',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
