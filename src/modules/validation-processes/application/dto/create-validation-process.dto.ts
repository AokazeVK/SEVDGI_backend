import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateValidationProcessDto {
  @ApiPropertyOptional({ example: 'uuid-document' })
  @IsOptional()
  @IsString()
  documentId?: string;

  @ApiPropertyOptional({ example: 'uuid-warehouse-entry' })
  @IsOptional()
  @IsString()
  warehouseEntryId?: string;
}
