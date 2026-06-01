import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class WarehouseEntryDetailDto {
  @ApiProperty({ example: 'uuid-medicine' })
  @IsString()
  medicineId!: string;

  @ApiProperty({ example: 'uuid-batch' })
  @IsString()
  batchId!: string;

  @ApiProperty({ example: 100 })
  @IsInt()
  @Min(1)
  quantity!: number;

  @ApiPropertyOptional({ example: 2.5 })
  @IsOptional()
  @IsNumber()
  unitCost?: number;
}
