import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDocumentFileDto {
  @ApiProperty({ example: 'uuid-document' })
  @IsString()
  documentId!: string;

  @ApiProperty({ example: 'uploads/documents/factura-519.pdf' })
  @IsString()
  filePath!: string;

  @ApiProperty({ example: 'factura-519.pdf' })
  @IsString()
  fileName!: string;

  @ApiProperty({ example: 'application/pdf' })
  @IsString()
  mimeType!: string;

  @ApiPropertyOptional({ example: 204800 })
  @IsOptional()
  @IsNumber()
  size?: number;
}
