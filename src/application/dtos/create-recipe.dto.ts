import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
export class CreateRecipeDto {
  @ApiProperty()
  @IsString({ message: i18nValidationMessage('validation.title') })
  title: string;

  constructor(title: string) {
    this.title = title;
  }
}
