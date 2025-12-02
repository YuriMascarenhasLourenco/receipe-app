import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';
import { CreateRecipeDto } from './create-recipe.dto';
import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';
export class RecipeDto extends CreateRecipeDto {
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'List of ingredients',
    example: '2 cups of flour, 1 cup of sugar, 1/2 cup of milk',
  })
  @IsArray()
  ingredients: string;

  @ApiProperty({
    description: 'Step-by-step cooking instructions',
    example: '1. Preheat the oven to 350°F (175°C). 2. Mix all ingredients...'
})
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
