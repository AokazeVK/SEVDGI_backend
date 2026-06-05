import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';

import { CreateExpertRuleActionDto } from './create-expert-rule-action.dto';
import { CreateExpertRuleConditionDto } from './create-expert-rule-condition.dto';

export class UpdateExpertRuleDto {
  @ApiPropertyOptional({
    example: 'FACTURA_NUMBER_REQUIRED',
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({
    example: 'Número de factura obligatorio',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Valida que la factura tenga número',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'DOCUMENTS',
  })
  @IsOptional()
  @IsString()
  module?: string;

  @ApiPropertyOptional({
    example: 1,
  })
  @IsOptional()
  @IsInt()
  priority?: number;

  @ApiPropertyOptional({
    type: [CreateExpertRuleConditionDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExpertRuleConditionDto)
  conditions?: CreateExpertRuleConditionDto[];

  @ApiPropertyOptional({
    type: [CreateExpertRuleActionDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExpertRuleActionDto)
  actions?: CreateExpertRuleActionDto[];
}
