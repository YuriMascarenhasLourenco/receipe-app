import { generateRecipeDto } from 'src/application/dtos/generate-recipe.dto';
import { Language } from '../common/language.common';

export abstract class AiServiceInterface {
  abstract chat(message: generateRecipeDto, lang: Language): Promise<string>;
}
