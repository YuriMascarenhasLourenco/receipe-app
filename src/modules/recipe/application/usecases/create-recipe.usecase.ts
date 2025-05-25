import { CreateRecipeDto } from '../dtos/create-recipe.dto';

import { HttpException, HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IRecipeRepository } from '../../domain/repository/recipe.repository';
import { IAIRecipeGenerator } from '../../domain/services/ai-recipe.interface';
import { Recipe } from '../../domain/enitities/recipe.entity';

export class CreateRecipeUseCase {
  constructor(
    private readonly repo: IRecipeRepository,
    private readonly aiGenerator: IAIRecipeGenerator,
  ) {}

  async execute(dto: CreateRecipeDto): Promise<Recipe> {
    const descriptionDto = dto.description;
    try {
      const description = await this.aiGenerator.generate(
        descriptionDto,
        dto.locale,
      );
      return await this.repo.save(plainToInstance(Recipe, description));
    } catch (err) {
      console.error('Error generating recipe description:', err);
      throw new HttpException(
        'Error generating recipe description',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
