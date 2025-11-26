import { Inject, Injectable } from '@nestjs/common';
import { RecipeMapper } from '../../infrastructure/mappers/recipe.mapper';
import { RecipeDto } from '../dtos/recipe.dto';
import { RecipeRepository } from 'src/domain/repository/recipe.repository';
@Injectable()
export class RecipeUseCase {
  constructor(
    @Inject('RecipeRepository')
    private readonly recipeService: RecipeRepository,
  ) {}
  async createRecipe(recipe: RecipeDto): Promise<RecipeDto> {
    const recipeEntity = RecipeMapper.toOrmEntity(recipe);
    return this.recipeService.create(recipeEntity);
  }
}
