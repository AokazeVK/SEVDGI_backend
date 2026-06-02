import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDoctorDto {
  @ApiPropertyOptional({ example: 'Dra. María López' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({ example: 'MED-12345' })
  @IsOptional()
  @IsString()
  licenseNumber?: string;

  @ApiPropertyOptional({ example: 'Oncología' })
  @IsOptional()
  @IsString()
  specialty?: string;
}
