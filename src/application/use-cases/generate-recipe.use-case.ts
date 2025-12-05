import { Inject, Injectable } from '@nestjs/common';
import { AiServiceInterface } from 'src/domain/services/huggingface.service';

import { generateRecipeDto } from '../dtos/generate-recipe.dto';
import { Language } from 'src/domain/common/language.common';

@Injectable()
export class GenerateTextUseCase {
  constructor(
    @Inject('AiServiceInterface')
    private readonly huggingFaceService: AiServiceInterface,
  ) {}

  async execute(prompt: generateRecipeDto, lang: Language): Promise<string> {
    return this.huggingFaceService.chat(prompt, lang);
  }
}
