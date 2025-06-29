import { User } from 'src/domain/entities/user.entity';
import { UserORMEntity } from '../database/typeorm/user.orm-entity';
import { RecipeMapper } from './recipe.mapper';
import { CreateUserDto } from 'src/application/dtos/create-user.dto';
import { UserDto } from 'src/application/dtos/user.dto';
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
  static fromcreateDtoToOrm(dto: CreateUserDto): UserORMEntity {
    const orm = new UserORMEntity();
    orm.username = dto.username;
    orm.email = dto.email;
    orm.password = dto.password;
    orm.createdAt = new Date();
    orm.updatedAt = new Date();
    return orm;
  }
  static toCreateDto(domain: User): CreateUserDto {
    return new CreateUserDto(domain.username, domain.email, domain.password);
  }
  static toDto(domain: UserORMEntity): UserDto {
    return new UserDto(
      domain.id,
      domain.username,
      domain.email,
      domain.password,
      domain.createdAt,
      domain.updatedAt,
      // Pass recipes as the last argument, assuming UserDto's constructor expects recipes last
      domain.recipes?.map((recipe) => RecipeMapper.toDto(recipe)) || [],
    );
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
