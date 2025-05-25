import { Recipe } from '../enitities/recipe.entity';

export interface IRecipeRepository {
  save(recipe: Recipe): Promise<Recipe>;
  findAll(): Promise<Recipe[]>;
}
