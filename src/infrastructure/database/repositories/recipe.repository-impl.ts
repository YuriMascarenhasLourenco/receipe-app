import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RecipeORMEntity } from '../typeorm/recipe.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeRepository } from 'src/domain/repository/recipe.repository';
import { i18nValidationMessage } from 'nestjs-i18n';

@Injectable()
export class RecipeRepositoryImpl implements RecipeRepository {
  constructor(
    @InjectRepository(RecipeORMEntity)
    private readonly Orm: Repository<RecipeORMEntity>,
  ) {}
  async create(recipe: RecipeORMEntity): Promise<RecipeORMEntity> {
    return await this.Orm.save(recipe);
  }
  async delete(id: number): Promise<void> {
    await this.Orm.delete(id);
  }
  async findAll(): Promise<RecipeORMEntity[]> {
    const recipes = await this.Orm.find();
    if (recipes.length === 0) {
      throw new HttpException(
        i18nValidationMessage('validation.noRecipesFound'),
        404,
      );
    }
    return recipes;
  }
  async findById(id: number): Promise<RecipeORMEntity | null> {
    const recipe = await this.Orm.findOne({ where: { id } });
    if (!recipe) {
      throw new HttpException(
        i18nValidationMessage('validation.recipeNotFound'),
        404,
      );
    }
    return recipe;
  }
  async update(
    id: number,
    recipe: RecipeORMEntity,
  ): Promise<RecipeORMEntity | null> {
    const existingRecipe = await this.Orm.findOne({ where: { id } });
    if (!existingRecipe) {
      throw new HttpException(
        i18nValidationMessage('validation.recipeNotFound'),
        404,
      );
    }
    existingRecipe.title = recipe.title;
    existingRecipe.instructions = recipe.instructions;
    existingRecipe.ingredients = recipe.ingredients;
    existingRecipe.updatedAt = new Date();
    await this.Orm.save(existingRecipe);
    return existingRecipe;
  }
}
