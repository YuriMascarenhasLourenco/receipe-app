import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UpdateRecipeDto {
  @ApiProperty()
  @IsNumber({}, { message: i18nValidationMessage('common.INVALID_INPUT') })
  id: number;

  @ApiProperty({
    description: 'the recipe name',
    example: 'Pancakes',
  })
  @IsString({ message: i18nValidationMessage('recipe.INVALID_RECIPE_NAME') })
  title?: string;

  @ApiProperty({
    description: 'the recipe ingredients',
    example: 'Flour, Eggs, Milk, Sugar, Baking Powder',
  })
  @IsString({ message: i18nValidationMessage('recipe.INGREDIENTS_REQUIRED') })
  ingredients?: string;

  @ApiProperty({
    description: 'the recipe instructions',
    example: '1. Mix ingredients. 2. Cook on a griddle until golden brown.',
  })
  @IsString({ message: i18nValidationMessage('recipe.INSTRUCTIONS_REQUIRED') })
  instructions?: string;
}
