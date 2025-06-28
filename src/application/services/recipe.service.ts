import { Injectable } from '@nestjs/common';
import { RecipeDto } from '../dtos/recipe.dto';
import { Recipe } from '../../domain/entities/recipe.entity';
import { RecipeRepository } from '../../domain/repository/recipe.repository';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async createRecipe(recipeDto: RecipeDto): Promise<Recipe> {
    const now = new Date();
    const recipe = new Recipe(
      recipeDto.recipeId,
      recipeDto.title,
      recipeDto.ingredients,
      recipeDto.instructions,
      now,
      now,
    );
    const recipeDtoInstance = plainToInstance(RecipeDto, recipe);
    await this.recipeRepository.create(recipeDtoInstance);
    return recipe;
  }

  async updateRecipe(id: string, recipeDto: RecipeDto): Promise<Recipe> {
    const recipe = await this.recipeRepository.findById(+id);
    if (!recipe) {
      throw new Error('Recipe not found');
    }
    recipe.title = recipeDto.title;
    recipe.ingredients = recipeDto.ingredients;
    recipe.instructions = recipeDto.instructions;
    return await this.recipeRepository.update(+id, recipe);
  }

  async deleteRecipe(id: string): Promise<void> {
    const recipe = await this.recipeRepository.findById(+id);
    if (!recipe) {
      throw new Error('Recipe not found');
    }
    await this.recipeRepository.delete(+id);
  }
}
