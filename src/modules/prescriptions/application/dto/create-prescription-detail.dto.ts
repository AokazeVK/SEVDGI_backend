import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreatePrescriptionDetailDto {
  @ApiProperty({ example: 'uuid-medicine' })
  @IsString()
  medicineId!: string;

  @ApiPropertyOptional({ example: '500mg' })
  @IsOptional()
  @IsString()
  dosage?: string;

  @ApiPropertyOptional({ example: 'Cada 8 horas' })
  @IsOptional()
  @IsString()
  frequency?: string;

  @ApiPropertyOptional({ example: '5 días' })
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiProperty({ example: 15 })
  @IsInt()
  @Min(1)
  quantity!: number;
}
