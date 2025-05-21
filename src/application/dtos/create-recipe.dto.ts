import { IsString } from 'class-validator';
export class CreateRecipeDto {
  @IsString()
  description: string[];
  locale: string;
}
