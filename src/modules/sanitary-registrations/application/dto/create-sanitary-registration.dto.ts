import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateSanitaryRegistrationDto {
  @ApiProperty()
  @IsString()
  medicineId!: string;

  @ApiProperty()
  @IsString()
  laboratoryId!: string;

  @ApiProperty({
    example: 'RS-12345',
  })
  @IsString()
  registrationNumber!: string;

  @ApiPropertyOptional({
    example: '2024-01-01',
  })
  @IsOptional()
  @IsDateString()
  issuedAt?: string;

  @ApiPropertyOptional({
    example: '2029-01-01',
  })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
