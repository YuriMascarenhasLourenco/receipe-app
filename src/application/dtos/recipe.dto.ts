import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';
import { CreateRecipeDto } from './create-recipe.dto';
import { UserDto } from './user.dto';
export class RecipeDto extends CreateRecipeDto {
  @IsNumber()
  id: number;
  @IsArray()
  ingredients: string;
  @IsString()
  instructions: string;
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt?: Date;
  user?: UserDto; // Relacionamento com o usuário
  // Relacionamento com o usuário
  constructor(
    id: number,
    title: string,
    ingredients: string,
    instructions: string,
    createdAt: Date,
    updatedAt?: Date,
    user?: UserDto, // Relacionamento com o usuário
  ) {
    super(title);
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
    this.id = id;
  }
}
