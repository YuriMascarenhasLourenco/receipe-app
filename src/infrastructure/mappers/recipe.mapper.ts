import { Recipe } from 'src/domain/entities/recipe.entity';
import { RecipeORMEntity } from '../database/typeorm/recipe.orm-entity';
import { UserMapper } from './user.mapper';
import { RecipeDto } from 'src/application/dtos/recipe.dto';

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
  static toDto(recipeOrmEntity: RecipeORMEntity): RecipeDto {
    return new RecipeDto(
      recipeOrmEntity.id,
      recipeOrmEntity.title,
      recipeOrmEntity.ingredients,
      recipeOrmEntity.instructions,
      recipeOrmEntity.createdAt,
      recipeOrmEntity.updatedAt,
      recipeOrmEntity.user ? UserMapper.toDto(recipeOrmEntity.user) : null, // Relacionamento
    );
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
