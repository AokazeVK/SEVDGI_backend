import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePharmacyReceptionDto {
  @ApiProperty({ example: 'uuid-pharmacy' })
  @IsString()
  pharmacyId!: string;

  @ApiProperty({ example: 'uuid-dispatch' })
  @IsString()
  dispatchId!: string;
}
