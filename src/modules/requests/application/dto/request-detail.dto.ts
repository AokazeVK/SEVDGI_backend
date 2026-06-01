import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class RequestDetailDto {
  @ApiProperty({ example: 'uuid-medicine' })
  @IsString()
  medicineId!: string;

  @ApiProperty({ example: 30 })
  @IsInt()
  @Min(1)
  quantity!: number;
}
