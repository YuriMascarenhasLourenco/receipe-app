import { Inject, Injectable } from '@nestjs/common';
import { AiServiceInterface } from 'src/domain/services/huggingface.service';
import { CreateRecipeDto } from '../dtos/create-recipe.dto';

@Injectable()
export class GenerateTextUseCase {
  constructor(
    @Inject('AiServiceInterface')
    private readonly huggingFaceService: AiServiceInterface,
  ) {}

  async execute(prompt: CreateRecipeDto): Promise<string> {
    return this.huggingFaceService.chat(prompt);
  }
}
