import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { WarehouseEntryDetailDto } from './warehouse-entry-detail.dto';

export class CreateWarehouseEntryDto {
  @ApiPropertyOptional({ example: 'uuid-supplier' })
  @IsOptional()
  @IsString()
  supplierId?: string;

  @ApiProperty({ example: 'uuid-warehouse' })
  @IsString()
  warehouseId!: string;

  @ApiPropertyOptional({ example: 'ING-0001' })
  @IsOptional()
  @IsString()
  entryNumber?: string;

  @ApiPropertyOptional({ example: 'FAC-123' })
  @IsOptional()
  @IsString()
  invoiceNumber?: string;

  @ApiPropertyOptional({ example: '2026-05-30' })
  @IsOptional()
  @IsDateString()
  entryDate?: string;

  @ApiProperty({ type: [WarehouseEntryDetailDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => WarehouseEntryDetailDto)
  details!: WarehouseEntryDetailDto[];
}
