import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDispatchDto {
  @ApiProperty({ example: 'uuid-request' })
  @IsString()
  requestId!: string;

  @ApiProperty({ example: 'uuid-warehouse' })
  @IsString()
  warehouseId!: string;
}
