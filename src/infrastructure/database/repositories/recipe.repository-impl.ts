import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RecipeORMEntity } from '../typeorm/recipe.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeRepository } from 'src/domain/repository/recipe.repository';

@Injectable()
export class RecipeRepositoryImpl implements RecipeRepository {
  constructor(
    @InjectRepository(RecipeORMEntity)
    private readonly Orm: Repository<RecipeORMEntity>,
  ) {}
  async create(recipe: RecipeORMEntity): Promise<RecipeORMEntity> {
    return this.Orm.save(recipe);
  }
  delete(id: number): Promise<void> {
    return this.Orm.delete(id).then(() => {});
  }
  async findAll(): Promise<RecipeORMEntity[]> {
    return this.Orm.find();
  }
  async findById(id: number): Promise<RecipeORMEntity | null> {
    const recipe = await this.Orm.findOne({ where: { id } });
    if (!recipe) {
      return null;
    }
    return recipe;
  }
  async update(
    id: number,
    recipe: RecipeORMEntity,
  ): Promise<RecipeORMEntity | null> {
    const existingRecipe = await this.Orm.findOne({ where: { id } });
    if (!existingRecipe) {
      return null;
    }
    existingRecipe.title = recipe.title;
    existingRecipe.instructions = recipe.instructions;
    existingRecipe.ingredients = recipe.ingredients;
    existingRecipe.updatedAt = new Date();
    await this.Orm.save(existingRecipe);
    return existingRecipe;
  }
}
