import { IsDate, IsNumber, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { RecipeDto } from './recipe.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto extends CreateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  salt: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  username: string;

  @IsDate()
  createdAt?: Date;

  @IsDate()
  updatedAt?: Date;
  recipes?: RecipeDto[];
  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    salt: string,
    createdAt?: Date,
    updatedAt?: Date,
    recipes?: RecipeDto[],
  ) {
    super(username, password, email);
    this.id = id;
    this.salt = salt;
    this.password = password;
    this.email = email;
    this.username = username;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.recipes = recipes;
  }
}
