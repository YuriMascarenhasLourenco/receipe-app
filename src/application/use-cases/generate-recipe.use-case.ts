import { Inject, Injectable } from '@nestjs/common';
import { AiServiceInterface } from 'src/domain/services/huggingface.service';

import { generateRecipeDto } from '../dtos/generate-recipe.dto';

@Injectable()
export class GenerateTextUseCase {
  constructor(
    @Inject('AiServiceInterface')
    private readonly huggingFaceService: AiServiceInterface,
  ) {}

  async execute(prompt: generateRecipeDto): Promise<string> {
    return this.huggingFaceService.chat(prompt);
  }
}
