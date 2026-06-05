import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateExpertRuleActionDto {
  @ApiProperty({ example: 'VALIDATE' })
  @IsString()
  actionType!: string;

  @ApiPropertyOptional({ example: 'REJECTED' })
  @IsOptional()
  @IsString()
  severity?: string;

  @ApiPropertyOptional({ example: 'No se encontró el número de factura' })
  @IsOptional()
  @IsString()
  message?: string;
}
