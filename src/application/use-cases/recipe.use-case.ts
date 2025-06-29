import { Injectable } from '@nestjs/common';
import { RecipeService } from '../services/recipe.service';
import { RecipeMapper } from '../../infrastructure/mappers/recipe.mapper';
import { RecipeDto } from '../dtos/recipe.dto';
@Injectable()
export class RecipeUseCase {
  constructor(private readonly recipeService: RecipeService) {}
  async createRecipe(recipe: RecipeDto): Promise<RecipeDto> {
    const recipeEntity = RecipeMapper.toOrmEntity(recipe);
    return this.recipeService.createRecipe(recipeEntity);
  }
}
