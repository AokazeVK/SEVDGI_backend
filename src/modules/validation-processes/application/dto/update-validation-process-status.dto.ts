import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

enum ValidationStatusDto {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  OBSERVED = 'OBSERVED',
}

export class UpdateValidationProcessStatusDto {
  @ApiProperty({
    enum: ValidationStatusDto,
    example: ValidationStatusDto.APPROVED,
  })
  @IsEnum(ValidationStatusDto)
  status!: ValidationStatusDto;
}
