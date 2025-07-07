import { IsDate, IsEmail, IsString } from 'class-validator';
import { RecipeDto } from './recipe.dto';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto {
  @IsString({ message: i18nValidationMessage('validation.username') })
  username: string;
  @IsString({ message: i18nValidationMessage('validation.password') })
  password: string;
  @IsEmail()
  email: string;
  @IsString()
  salt: string;
  @IsDate()
  createdAt?: Date;
  @IsDate()
  updatedAt?: Date;
  recipes?: RecipeDto[];

  constructor(
    username: string,
    password: string,
    email: string,
    salt?: string,
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
    this.salt = salt;
  }
}
