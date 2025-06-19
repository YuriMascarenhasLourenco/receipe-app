import { RecipeDto } from 'src/application/dtos/recipe.dto';

export interface RecipeRepository {
  findAll(): Promise<RecipeDto[]>;
  findById(id: number): Promise<RecipeDto | null>;
  create(recipe: RecipeDto): Promise<RecipeDto>;
  update(id: number, recipe: RecipeDto): Promise<RecipeDto | null>;
  delete(id: number): Promise<void>;
}
