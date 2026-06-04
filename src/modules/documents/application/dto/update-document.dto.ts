import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDocumentDto {
  @ApiPropertyOptional({ example: 'uuid-document-type' })
  @IsOptional()
  @IsString()
  documentTypeId?: string;

  @ApiPropertyOptional({ example: 'Factura N° 519' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Factura del proveedor para ingreso de medicamento' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'uuid-warehouse-entry' })
  @IsOptional()
  @IsString()
  warehouseEntryId?: string;

  @ApiPropertyOptional({ example: 'uuid-prescription' })
  @IsOptional()
  @IsString()
  prescriptionId?: string;
}
