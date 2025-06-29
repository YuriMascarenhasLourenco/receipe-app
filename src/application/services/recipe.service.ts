import { Inject, Injectable } from '@nestjs/common';
import { RecipeDto } from '../dtos/recipe.dto';
import { RecipeRepository } from '../../domain/repository/recipe.repository';
@Injectable()
export class RecipeService {
  constructor(
    @Inject('RecipeRepository')
    private readonly recipeRepository: RecipeRepository,
  ) {}

  async createRecipe(recipe: RecipeDto): Promise<RecipeDto> {
    return this.recipeRepository.create(recipe);
  }

  async updateRecipe(id: number, recipe: RecipeDto): Promise<RecipeDto | null> {
    return this.recipeRepository.update(id, recipe);
  }

  async deleteRecipe(id: string): Promise<void> {
    const recipe = await this.recipeRepository.findById(+id);
    if (!recipe) {
      throw new Error('Recipe not found');
    }
    await this.recipeRepository.delete(+id);
  }
}
