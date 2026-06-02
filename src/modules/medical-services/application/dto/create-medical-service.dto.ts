import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateMedicalServiceDto {
  @ApiProperty({
    example: 'Oncología',
  })
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    example: 'Servicio médico de oncología',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
