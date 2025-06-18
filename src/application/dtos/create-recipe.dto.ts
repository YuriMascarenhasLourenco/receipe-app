import { IsString } from 'class-validator';
export class CreateRecipeDto {
  @IsString()
  title: string;

  constructor(title: string) {
    this.title = title;
  }
}
