import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateOcrResultDto {
  @ApiProperty({ example: 'uuid-document' })
  @IsString()
  documentId!: string;

  @ApiProperty({
    example:
      'Factura N° 519\nProveedor: Schmidts Pharma\nNIT: 1020623027\nCantidad: 175\nMonto: 19950',
  })
  @IsString()
  rawText!: string;

  @ApiPropertyOptional({ example: 0.92 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  confidence?: number;
}
