import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class generateRecipeDto {
  @ApiProperty({
    description: 'the recipe name',
    example: 'Pancakes',
  })
  @IsString()
  title: string;
}
