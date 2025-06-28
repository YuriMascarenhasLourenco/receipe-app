import { User } from 'src/domain/entities/user.entity';
import { UserORMEntity } from '../database/typeorm/user.orm-entity';
import { RecipeMapper } from './recipe.mapper';

export class UserMapper {
  static toOrmEntity(domain: User): UserORMEntity {
    const orm = new UserORMEntity();
    orm.id = domain.id;
    orm.username = domain.username;
    orm.email = domain.email;
    orm.password = domain.password;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    orm.recipes =
      domain.recipes?.map((recipe) => RecipeMapper.toOrmEntity(recipe)) || [];
    return orm;
  }

  static toDomainEntity(orm: UserORMEntity): User {
    return new User(
      orm.id,
      orm.username,
      orm.email,
      orm.password,
      orm.createdAt,
      orm.updatedAt,
      orm.recipes?.map((recipe) => RecipeMapper.toDomain(recipe)) || [],
    );
  }
}
