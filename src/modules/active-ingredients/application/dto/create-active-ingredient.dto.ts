import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateActiveIngredientDto {
  @ApiProperty({ example: 'Paracetamol' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({ example: 'Analgésico y antipirético' })
  @IsOptional()
  @IsString()
  description?: string;
}
