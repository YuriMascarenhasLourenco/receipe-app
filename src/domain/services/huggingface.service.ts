import { CreateRecipeDto } from 'src/application/dtos/create-recipe.dto';

export abstract class AiServiceInterface {
  abstract chat(message: CreateRecipeDto): Promise<string>;
}
