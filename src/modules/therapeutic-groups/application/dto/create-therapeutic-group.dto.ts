import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateTherapeuticGroupDto {
  @ApiProperty({ example: 'Analgésicos' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    example: 'Medicamentos para aliviar el dolor',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
