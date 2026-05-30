import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePharmaceuticalFormDto {
  @ApiPropertyOptional({
    example: 'Tableta',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
