import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateRecipeDto } from 'src/application/dtos/create-recipe.dto';
import { RecipeDto } from 'src/application/dtos/recipe.dto';
import { UpdateRecipeDto } from 'src/application/dtos/update-recipe.dto';
import { RecipeUseCase } from 'src/application/use-cases/recipe.use-case';

@ApiBearerAuth('access-token')
@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeUseCase: RecipeUseCase) {}

  @Post('/new')
  async createRecipe(@Body() data: CreateRecipeDto) {
    return this.recipeUseCase.createRecipe(data);
  }
  @Get()
  async getAllRecipes(): Promise<RecipeDto[]> {
    return this.recipeUseCase.getAllRecipes();
  }
  @Patch()
  async updateRecipe(@Body() data: UpdateRecipeDto): Promise<RecipeDto | null> {
    return this.recipeUseCase.updateRecipe(data);
  }
  @Delete()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
      },
    },
  })
  async deleteRecipe(@Body('id') id: number): Promise<void> {
    return this.recipeUseCase.deleteRecipe(id);
  }
  @Get('/:id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
      },
    },
  })
  async getRecipeById(@Body('id') id: number): Promise<RecipeDto | null> {
    return this.recipeUseCase.getRecipeById(id);
  }
}
