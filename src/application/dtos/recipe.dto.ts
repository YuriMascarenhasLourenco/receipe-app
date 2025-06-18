import { CreateRecipeDto } from './create-recipe.dto';
export class RecipeDto extends CreateRecipeDto {
  recipeId: number;
  ingredients: string[];
  instructions: string;
  constructor(title: string, ingredients: string[], instructions: string) {
    super(title);
    this.ingredients = ingredients;
    this.instructions = instructions;
  }
}
