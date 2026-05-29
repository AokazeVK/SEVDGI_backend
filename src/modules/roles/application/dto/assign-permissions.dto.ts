import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class AssignPermissionsDto {
  @ApiProperty({
    example: ['uuid-permission-1', 'uuid-permission-2'],
  })
  @IsArray()
  @IsString({ each: true })
  permissionIds!: string[];
}
