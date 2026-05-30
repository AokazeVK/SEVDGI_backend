import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateActiveIngredientDto {
  @ApiPropertyOptional({ example: 'Paracetamol' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Analgésico y antipirético' })
  @IsOptional()
  @IsString()
  description?: string;
}
