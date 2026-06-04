import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateDocumentTypeDto {
  @ApiProperty({ example: 'FACTURA' })
  @IsString()
  code!: string;

  @ApiProperty({ example: 'Factura' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    example: 'Documento tributario emitido por el proveedor',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;
}
