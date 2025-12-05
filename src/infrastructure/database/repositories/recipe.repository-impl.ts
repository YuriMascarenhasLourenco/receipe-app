import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RecipeORMEntity } from '../typeorm/recipe.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeRepository } from 'src/domain/interfaces/repository/recipe.repository';
import { i18nValidationMessage } from 'nestjs-i18n';
import { plainToInstance } from 'class-transformer';
import { RecipeDto } from 'src/application/dtos/recipe.dto';

@Injectable()
export class RecipeRepositoryImpl implements RecipeRepository {
  constructor(
    @InjectRepository(RecipeORMEntity)
    private readonly Orm: Repository<RecipeORMEntity>,
  ) { }
  async create(recipe: RecipeORMEntity): Promise<RecipeORMEntity> {
    return await this.Orm.save(recipe);
  }
  async delete(id: number): Promise<void> {
    await this.Orm.delete(id);
  }
  async findAll(): Promise<RecipeDto[]> {
    try {
      const recipes = await this.Orm.find();
      if (recipes.length === 0) {
        throw new HttpException(
          i18nValidationMessage('validation.noRecipesFound'),
          HttpStatus.NOT_FOUND,
        );
      }
      return plainToInstance(RecipeDto, recipes);
    } catch (error) {
      throw new HttpException(
        i18nValidationMessage('validation.unableToFetchRecipes'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findById(id: number): Promise<RecipeORMEntity | null> {
    try {
      const recipe = await this.Orm.findOne({ where: { id } });
      if (!recipe) {
        throw new HttpException(
          i18nValidationMessage('validation.recipeNotFound'),
          HttpStatus.NOT_FOUND,
        );
      }
      return recipe;
    } catch (error) {
      throw new HttpException(
        i18nValidationMessage('validation.unableToFetchRecipe'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async update(recipe: RecipeORMEntity): Promise<RecipeORMEntity | null> {
    try {
      const existingRecipe = await this.Orm.findOne({
        where: { id: recipe.id },
      });
      if (!existingRecipe) {
        throw new HttpException(
          i18nValidationMessage('validation.recipeNotFound'),
          HttpStatus.NOT_FOUND,
        );
      }
      existingRecipe.title = recipe.title;
      existingRecipe.instructions = recipe.instructions;
      existingRecipe.ingredients = recipe.ingredients;
      existingRecipe.updatedAt = new Date();
      await this.Orm.save(existingRecipe);
      return existingRecipe;
    } catch (error) {
      throw new HttpException(
        i18nValidationMessage('validation.unableToUpdateRecipe'),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
