import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'FARMACIA' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({ example: 'Encargado de farmacia' })
  @IsOptional()
  @IsString()
  description?: string;
}
