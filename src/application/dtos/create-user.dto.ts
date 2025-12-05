import { IsEmail, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto {
  @ApiProperty({
    description: 'the username of the user',
    example: 'john_doe',
  })
  @IsString({ message: 'validation.NAME_REQUIRED' })
  username: string;

  @ApiProperty({
    description: 'the password of the user',
    example: 'StrongP@ssw0rd!',
  })
  @IsString({ message: i18nValidationMessage('validation.PASSWORD_REQUIRED') })
  password: string;

  @ApiProperty({
    description: 'the email of the user',
    example: 'anyName@domain.com',
  })
  @IsEmail({}, { message: i18nValidationMessage('validation.EMAIL_INVALID') })
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
