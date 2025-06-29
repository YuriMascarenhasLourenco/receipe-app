import { Controller, Post } from '@nestjs/common';
import { RecipeDto } from 'src/application/dtos/recipe.dto';
import { RecipeUseCase } from 'src/application/use-cases/recipe.use-case';

@Controller('recipes')
export class RecipeController {
 constructor(private readonly recipeUseCase: RecipeUseCase) {}
 @Post('/new')
  async createRecipe(recipeDto: RecipeDto) {
    return this.recipeUseCase.createRecipe(recipeDto);
  }
}
