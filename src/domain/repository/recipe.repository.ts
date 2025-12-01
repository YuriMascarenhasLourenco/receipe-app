import { RecipeDto } from 'src/application/dtos/recipe.dto';
import { RecipeORMEntity } from 'src/infrastructure/database/typeorm/recipe.orm-entity';

export interface RecipeRepository {
  findAll(): Promise<RecipeDto[]>;
  findById(id: number): Promise<RecipeDto | null>;
  create(recipe: RecipeDto): Promise<RecipeDto>;
  update(data: RecipeORMEntity): Promise<RecipeDto | null>;
  delete(id: number): Promise<void>;
}
