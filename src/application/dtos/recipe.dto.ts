import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';
import { CreateRecipeDto } from './create-recipe.dto';
export class RecipeDto extends CreateRecipeDto {
  @IsNumber()
  recipeId: number;
  @IsArray()
  ingredients: string;
  @IsString()
  instructions: string;
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt?: Date;
  constructor(
    recipeId: number,
    title: string,
    ingredients: string,
    instructions: string,
    createdAt: Date,
    updatedAt?: Date,
  ) {
    super(title);
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
