import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RecipeDto } from 'src/application/dtos/recipe.dto';
import { RecipeUseCase } from 'src/application/use-cases/recipe.use-case';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeUseCase: RecipeUseCase) {}

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post('/new')
  async createRecipe(@Body() recipeDto: RecipeDto) {
    return this.recipeUseCase.createRecipe(recipeDto);
  }
}
