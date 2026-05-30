import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateMedicineDto {
  @ApiPropertyOptional({ example: 'PARA500' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ example: 'Paracetamol' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({ example: 'Analgésico y antipirético' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: '500' })
  @IsOptional()
  @IsString()
  concentration?: string;

  @ApiPropertyOptional({ example: 'Caja x 100 tabletas' })
  @IsOptional()
  @IsString()
  presentation?: string;

  @ApiPropertyOptional({ example: 'uuid-forma-farmaceutica' })
  @IsOptional()
  @IsString()
  pharmaceuticalFormId?: string;

  @ApiPropertyOptional({ example: 'uuid-unidad' })
  @IsOptional()
  @IsString()
  unitId?: string;

  @ApiPropertyOptional({ example: 'uuid-grupo-terapeutico' })
  @IsOptional()
  @IsString()
  therapeuticGroupId?: string;

  @ApiPropertyOptional({ example: 'uuid-fabricante' })
  @IsOptional()
  @IsString()
  manufacturerId?: string;

  @ApiPropertyOptional({
    example: ['uuid-principio-activo'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  activeIngredientIds?: string[];
}
