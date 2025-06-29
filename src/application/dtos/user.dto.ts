import { IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { RecipeDto } from './recipe.dto';

export class UserDto extends CreateUserDto {
  @IsNumber()
  id: number;

  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    createdAt?: Date,
    updatedAt?: Date,
    recipes?: RecipeDto[],
  ) {
    super(username, password, email, createdAt, updatedAt, recipes);
  }
}
