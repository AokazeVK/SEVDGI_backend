import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUnitDto {
  @ApiProperty({ example: 'Miligramo' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'mg' })
  @IsString()
  symbol!: string;
}
