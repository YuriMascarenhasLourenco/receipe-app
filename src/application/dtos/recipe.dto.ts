import { IsArray, IsNumber, IsString } from 'class-validator';
import { CreateRecipeDto } from './create-recipe.dto';
export class RecipeDto extends CreateRecipeDto {
  @IsNumber()
  recipeId: number;
  @IsArray()
  ingredients: string[];
  @IsString()
  instructions: string;
  constructor(title: string, ingredients: string[], instructions: string) {
    super(title);
    this.ingredients = ingredients;
    this.instructions = instructions;
  }
}
