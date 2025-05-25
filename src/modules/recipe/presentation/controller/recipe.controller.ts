import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateRecipeUseCase } from '../../application/usecases/create-recipe.usecase';
import { CreateRecipeDto } from '../../application/dtos/create-recipe.dto';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly useCase: CreateRecipeUseCase) {}

  @Post()
  async create(@Body() dto: CreateRecipeDto) {
    const recipe = await this.useCase.execute(dto);
    return recipe;
  }

  @Get()
  async list() {
    return 'Em breve: listagem de receitas';
  }
}
