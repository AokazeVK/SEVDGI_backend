import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

export class CreateSupplierDto {
  @ApiPropertyOptional({
    example: '1020304050',
  })
  @IsOptional()
  @IsString()
  nit?: string;

  @ApiProperty({
    example: 'Distribuidora Farmacéutica Bolivia',
  })
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    example: '77777777',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    example: 'La Paz - Bolivia',
  })
  @IsOptional()
  @IsString()
  address?: string;
}
