import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateSanitaryRegistrationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  medicineId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  laboratoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  registrationNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  issuedAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
