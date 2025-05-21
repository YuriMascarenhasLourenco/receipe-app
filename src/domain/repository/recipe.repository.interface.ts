import { Recipe } from '../entities/recipe.repository';

export interface IRecipeRepository {
  save(recipe: Recipe): Promise<Recipe>;
  findAll(): Promise<Recipe[]>;
}
