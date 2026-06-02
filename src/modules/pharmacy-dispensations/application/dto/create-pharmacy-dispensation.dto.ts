import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePharmacyDispensationDto {
  @ApiProperty({ example: 'uuid-pharmacy' })
  @IsString()
  pharmacyId!: string;

  @ApiProperty({ example: 'uuid-patient' })
  @IsString()
  patientId!: string;

  @ApiProperty({ example: 'uuid-prescription' })
  @IsString()
  prescriptionId!: string;
}
