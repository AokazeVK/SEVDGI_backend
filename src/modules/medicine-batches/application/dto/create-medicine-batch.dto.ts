import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateMedicineBatchDto {
  @ApiProperty({ example: 'uuid-medicine' })
  @IsString()
  medicineId!: string;

  @ApiProperty({ example: 'A001' })
  @IsString()
  batchNumber!: string;

  @ApiProperty({ example: '2027-12-31' })
  @IsDateString()
  expirationDate!: string;
}
