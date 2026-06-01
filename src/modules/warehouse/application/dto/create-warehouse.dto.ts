import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateWarehouseDto {
  @ApiProperty({ example: 'Almacén Central' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({ example: 'Almacén principal de medicamentos' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'Centro de Medicina Nuclear' })
  @IsOptional()
  @IsString()
  location?: string;
}
