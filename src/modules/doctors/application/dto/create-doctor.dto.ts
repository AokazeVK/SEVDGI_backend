import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({ example: 'Dra. María López' })
  @IsString()
  fullName!: string;

  @ApiPropertyOptional({ example: 'MED-12345' })
  @IsOptional()
  @IsString()
  licenseNumber?: string;

  @ApiPropertyOptional({ example: 'Oncología' })
  @IsOptional()
  @IsString()
  specialty?: string;
}
