import { IsDate, IsEmail, IsString } from 'class-validator';
import { RecipeDto } from './recipe.dto';
import { i18nValidationMessage } from 'nestjs-i18n';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString({ message: i18nValidationMessage('validation.username') })
  username: string;

  @ApiProperty()
  @IsString({ message: i18nValidationMessage('validation.password') })
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;
  @IsString()
  salt?: string;

  constructor(
    username: string,
    password: string,
    email: string,
    salt?: string,
  ) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.salt = '';
  }
}
