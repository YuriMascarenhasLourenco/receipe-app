import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @ApiProperty()
  @IsString({ message: i18nValidationMessage('validation.email') })
  email: string;

  @ApiProperty()
  @IsString({ message: i18nValidationMessage('validation.password') })
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
