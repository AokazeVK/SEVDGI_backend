import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

import { RequestDetailDto } from './request-detail.dto';

export class CreateRequestDto {
  @ApiProperty({ example: 'uuid-pharmacy' })
  @IsString()
  pharmacyId!: string;

  @ApiPropertyOptional({ example: 'Reposición para farmacia central' })
  @IsOptional()
  @IsString()
  observation?: string;

  @ApiProperty({ type: [RequestDetailDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RequestDetailDto)
  details!: RequestDetailDto[];
}
