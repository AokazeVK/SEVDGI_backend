import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateExpertRuleConditionDto {
  @ApiProperty({ example: 'FACTURA_NUMBER' })
  @IsString()
  leftField!: string;

  @ApiProperty({ example: 'EXISTS' })
  @IsString()
  operator!: string;

  @ApiPropertyOptional({ example: 'NOTA_INGRESO_NUMBER' })
  @IsOptional()
  @IsString()
  rightField?: string;

  @ApiPropertyOptional({ example: '519' })
  @IsOptional()
  @IsString()
  expectedValue?: string;
}
