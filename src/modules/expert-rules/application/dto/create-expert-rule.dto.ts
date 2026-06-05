import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';

import { CreateExpertRuleActionDto } from './create-expert-rule-action.dto';
import { CreateExpertRuleConditionDto } from './create-expert-rule-condition.dto';

export class CreateExpertRuleDto {
  @ApiProperty({ example: 'FACTURA_NUMBER_REQUIRED' })
  @IsString()
  code!: string;

  @ApiProperty({ example: 'Número de factura obligatorio' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    example: 'Valida que la factura tenga número',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'DOCUMENTS' })
  @IsOptional()
  @IsString()
  module?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  priority?: number;

  @ApiProperty({ type: [CreateExpertRuleConditionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExpertRuleConditionDto)
  conditions!: CreateExpertRuleConditionDto[];

  @ApiProperty({ type: [CreateExpertRuleActionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExpertRuleActionDto)
  actions!: CreateExpertRuleActionDto[];
}
