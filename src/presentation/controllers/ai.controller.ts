import { Controller, Post, Body } from '@nestjs/common';
import { GenerateTextUseCase } from 'src/application/use-cases/generate-recipe.use-case';
import { Public } from 'src/infrastructure/auth/decorators/public.decorator';

@Controller('text')
export class TextController {
  constructor(private readonly generateTextUseCase: GenerateTextUseCase) {}

  @Public()
  @Post('generate')
  async generate(@Body('prompt') prompt: string) {
    const result = await this.generateTextUseCase.execute(prompt);
    return { result };
  }
}
