import { Inject, Injectable } from '@nestjs/common';
import { RecipeMapper } from '../../infrastructure/mappers/recipe.mapper';
import { RecipeDto } from '../dtos/recipe.dto';
import { RecipeRepository } from 'src/domain/repository/recipe.repository';
import { UpdateRecipeDto } from '../dtos/update-recipe.dto';
import { CreateRecipeDto } from '../dtos/create-recipe.dto';
@Injectable()
export class RecipeUseCase {
  constructor(
    @Inject('RecipeRepository')
    private readonly recipeService: RecipeRepository,
  ) {}
  async createRecipe(recipe: CreateRecipeDto): Promise<RecipeDto> {
    const recipeEntity = RecipeMapper.toOrmEntity(recipe);
    return this.recipeService.create(recipeEntity);
  }
  async getAllRecipes(): Promise<RecipeDto[]> {
    return this.recipeService.findAll();
  }
  async deleteRecipe(id: number): Promise<void> {
    return this.recipeService.delete(id);
  }
  async updateRecipe(recipe: UpdateRecipeDto): Promise<RecipeDto | null> {
    const recipeORM = RecipeMapper.toOrmEntityUpdate(recipe);
    return this.recipeService.update(recipeORM);
  }
  async getRecipeById(id: number): Promise<RecipeDto | null> {
    return this.recipeService.findById(id);
  }
}
