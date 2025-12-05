import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { generateRecipeDto } from 'src/application/dtos/generate-recipe.dto';
import { GenerateTextUseCase } from 'src/application/use-cases/generate-recipe.use-case';
import { Language } from 'src/domain/common/language.common';
import { Public } from 'src/infrastructure/auth/decorators/public.decorator';
import { LanguageHeader } from '../decorators/language-header.decorator';

@ApiTags('AI')
@LanguageHeader()
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
    @I18n() i18n: I18nContext,
  ): Promise<{ result: string }> {
    const lang = i18n.lang as Language;

    const result = await this.generateTextUseCase.execute(prompt, lang);
    return { result };
  }
}
