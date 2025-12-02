import { IsEmail, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'the username of the user',
    example: 'john_doe',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'the password of the user',
    example: 'StrongP@ssw0rd!',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'the email of the user',
    example: 'anyName@domain.com',
  })
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
