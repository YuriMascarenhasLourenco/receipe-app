import { Recipe } from 'src/domain/entities/recipe.entity';
import { RecipeORMEntity } from '../database/typeorm/recipe.orm-entity';
import { UserMapper } from './user.mapper';

export class RecipeMapper {
  static toDomain(recipeOrmEntity: RecipeORMEntity): Recipe {
    return {
      id: recipeOrmEntity.id,
      title: recipeOrmEntity.title,
      instructions: recipeOrmEntity.instructions,
      createdAt: recipeOrmEntity.createdAt,
      updatedAt: recipeOrmEntity.updatedAt,
      ingredients: recipeOrmEntity.ingredients,
    };
  }

  static toOrmEntity(recipeDomainEntity: Recipe): RecipeORMEntity {
    const orm = new RecipeORMEntity();
    orm.id = recipeDomainEntity.id;
    orm.title = recipeDomainEntity.title;
    orm.ingredients = recipeDomainEntity.ingredients;
    orm.instructions = recipeDomainEntity.instructions;
    orm.user = recipeDomainEntity.user
      ? UserMapper.toOrmEntity(recipeDomainEntity.user)
      : null; // Relacionamento
    return orm;
  }
}
