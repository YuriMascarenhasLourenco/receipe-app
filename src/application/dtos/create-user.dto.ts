import { IsDate, IsEmail, IsString } from 'class-validator';
import { RecipeDto } from './recipe.dto';

export class CreateUserDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsEmail()
  email: string;
  @IsDate()
  createdAt?: Date;
  @IsDate()
  updatedAt?: Date;
  recipes?: RecipeDto[];

  constructor(
    username: string,
    password: string,
    email: string,
    createdAt?: Date,
    updatedAt?: Date,
    recipes: RecipeDto[] = [],
  ) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
    this.recipes = recipes;
  }
}
