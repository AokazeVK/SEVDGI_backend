import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateOcrExtractedFieldDto {
  @ApiProperty({ example: 'uuid-ocr-result' })
  @IsString()
  ocrResultId!: string;

  @ApiProperty({ example: 'FACTURA_NUMBER' })
  @IsString()
  fieldName!: string;

  @ApiPropertyOptional({ example: '519' })
  @IsOptional()
  @IsString()
  value?: string;

  @ApiPropertyOptional({ example: 0.95 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  confidence?: number;
}
