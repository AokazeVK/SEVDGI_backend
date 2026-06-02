import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsOptional, IsString, ValidateNested } from 'class-validator';

import { CreatePrescriptionDetailDto } from './create-prescription-detail.dto';

export class CreatePrescriptionDto {
  @ApiProperty({ example: 'uuid-patient' })
  @IsString()
  patientId!: string;

  @ApiPropertyOptional({ example: 'uuid-doctor' })
  @IsOptional()
  @IsString()
  doctorId?: string;

  @ApiPropertyOptional({ example: 'uuid-medical-service' })
  @IsOptional()
  @IsString()
  medicalServiceId?: string;

  @ApiPropertyOptional({ example: 'RX-001' })
  @IsOptional()
  @IsString()
  prescriptionNumber?: string;

  @ApiPropertyOptional({ example: '2026-06-02' })
  @IsOptional()
  @IsDateString()
  issuedAt?: string;

  @ApiPropertyOptional({ example: 'Dolor post tratamiento' })
  @IsOptional()
  @IsString()
  diagnosis?: string;

  @ApiPropertyOptional({ example: 'Tomar después de las comidas' })
  @IsOptional()
  @IsString()
  observation?: string;

  @ApiProperty({ type: [CreatePrescriptionDetailDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePrescriptionDetailDto)
  details!: CreatePrescriptionDetailDto[];
}
