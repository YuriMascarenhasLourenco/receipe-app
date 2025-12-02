import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
export class CreateRecipeDto {
  @ApiProperty({
    description: 'the recipe name',
    example: 'Pancakes',
  })
  @IsString({ message: i18nValidationMessage('validation.title') })
  title: string;
  @ApiProperty({
    description: 'the recipe ingredients',
    example: 'Flour, Eggs, Milk, Sugar, Baking Powder',
  })
  @IsString({ message: i18nValidationMessage('validation.ingredients') })
  ingredients: string;
  @ApiProperty({
    description: 'the recipe instructions',
    example: '1. Mix ingredients. 2. Cook on a griddle until golden brown.',
  })
  @IsString({ message: i18nValidationMessage('validation.instructions') })
  instructions: string;

  constructor(title: string) {
    this.title = title;
  }
}
