import { RecipeDto } from 'src/application/dtos/recipe.dto';

// domain/services/ai-recipe-generator.interface.ts
export interface IAIRecipeGenerator {
  generate(descriptionDto: string[], locale: string): Promise<RecipeDto>;
}
