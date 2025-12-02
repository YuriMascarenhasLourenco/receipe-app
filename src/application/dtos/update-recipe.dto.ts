import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateRecipeDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'the recipe name',
    example: 'Pancakes',
  })
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'the recipe ingredients',
    example: 'Flour, Eggs, Milk, Sugar, Baking Powder',
  })
  @IsString()
  ingredients?: string;

  @ApiProperty({
    description: 'the recipe instructions',
    example: '1. Mix ingredients. 2. Cook on a griddle until golden brown.',
  })
  @IsString()
  instructions?: string;
}
