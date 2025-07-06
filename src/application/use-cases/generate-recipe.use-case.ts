import { Inject, Injectable } from '@nestjs/common';
import { AiServiceInterface } from 'src/domain/services/huggingface.service';

@Injectable()
export class GenerateTextUseCase {
  constructor(
    @Inject('HuggingFaceServiceInterface')
    private readonly huggingFaceService: AiServiceInterface,
  ) {}

  async execute(prompt: string): Promise<string> {
    return this.huggingFaceService.chat(prompt);
  }
}
