import { IsEmail, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
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
