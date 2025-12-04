import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRecipeDto } from 'src/application/dtos/create-recipe.dto';
import { RecipeDto } from 'src/application/dtos/recipe.dto';
import { UpdateRecipeDto } from 'src/application/dtos/update-recipe.dto';
import { RecipeUseCase } from 'src/application/use-cases/recipe.use-case';
@ApiHeader({
  name: 'Accept-Language',
  description:
    'Language preference for the response. Supported values: en (English), pt (Portuguese). Default is en.',
  required: false,
})
@ApiBearerAuth('access-token')
@Controller('recipes')
@ApiTags('Recipes')
export class RecipeController {
  constructor(private readonly recipeUseCase: RecipeUseCase) {}

  @Post('/new')
  @ApiOperation({
    summary: 'Generates the new recipe using LLM',
    description:
      'Recives the recipe name to generate a new recipe using Azure AI Foundry LLM models.',
  })
  @ApiResponse({
    status: 201,
    description: 'Recipe created successfully.',
    type: RecipeDto,
  })
  async createRecipe(@Body() data: CreateRecipeDto) {
    return this.recipeUseCase.createRecipe(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieves all recipes',
    description: 'Fetches a list of all recipes stored in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all recipes retrieved successfully.',
    type: [RecipeDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access.',
  })
  async getAllRecipes(): Promise<RecipeDto[]> {
    return this.recipeUseCase.getAllRecipes();
  }

  @Patch()
  @ApiOperation({
    summary: 'Updates an existing recipe',
    description:
      'Updates the details of an existing recipe based on provided data.',
  })
  @ApiResponse({
    status: 200,
    description: 'Recipe updated successfully.',
    type: RecipeDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Recipe not found.',
  })
  async updateRecipe(@Body() data: UpdateRecipeDto): Promise<RecipeDto | null> {
    return this.recipeUseCase.updateRecipe(data);
  }
  @Delete()
  @ApiOperation({
    summary: 'Deletes a recipe by ID',
    description: 'Removes a recipe from the system based on the provided ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Recipe deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Recipe not found.',
  })
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
  @ApiOperation({
    summary: 'Retrieves a recipe by ID',
    description: 'Fetches a single recipe based on the provided ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Recipe retrieved successfully.',
    type: RecipeDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Recipe not found.',
  })
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
