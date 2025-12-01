import { generateRecipeDto } from 'src/application/dtos/generate-recipe.dto';

export abstract class AiServiceInterface {
  abstract chat(message: generateRecipeDto): Promise<string>;
}
