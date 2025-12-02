import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginDto {
  @ApiProperty({
    description: 'the user email',
    example: 'anyemail@domain.com',
  })
  @IsString({ message: i18nValidationMessage('validation.email') })
  email: string;

  @ApiProperty({
    description: 'the user password',
    example: 'strongPassword123',
  })
  @IsString({ message: i18nValidationMessage('validation.password') })
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
