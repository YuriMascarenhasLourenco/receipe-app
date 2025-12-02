import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { generateRecipeDto } from 'src/application/dtos/generate-recipe.dto';
import { GenerateTextUseCase } from 'src/application/use-cases/generate-recipe.use-case';
import { Public } from 'src/infrastructure/auth/decorators/public.decorator';

@ApiTags('AI')
@Controller('text')
export class TextController {
  constructor(private readonly generateTextUseCase: GenerateTextUseCase) {}

  @Public()
  @Post('generate')
  @ApiOperation({
    summary: 'Generate a recipe using AI',
  })
  @ApiBody({
    schema: {
      example: {
        title: 'Pancakes',
      },
    },
  })
  async generate(
    @Body() prompt: generateRecipeDto,
  ): Promise<{ result: string }> {
    const result = await this.generateTextUseCase.execute(prompt);
    return { result };
  }
}
