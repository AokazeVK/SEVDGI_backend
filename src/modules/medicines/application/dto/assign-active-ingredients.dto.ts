import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class AssignActiveIngredientsDto {
  @ApiProperty({
    example: ['uuid-principio-activo'],
  })
  @IsArray()
  @IsString({ each: true })
  activeIngredientIds!: string[];
}
