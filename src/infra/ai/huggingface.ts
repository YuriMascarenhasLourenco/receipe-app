import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { IAIRecipeGenerator } from 'src/domain/services/ai-recipe.interface';
import { RecipeDto } from 'src/application/dtos/recipe.dto';

@Injectable()
export class HuggingFaceRecipeGenerator implements IAIRecipeGenerator {
  private readonly API_URL =
    'https://api-inference.huggingface.co/models/YOUR_MODEL';
  private readonly API_KEY = 'YOUR_API_KEY';
  async generate(descriptionDto: string[], locale: string): Promise<RecipeDto> {
    const response = await axios.post(
      this.API_URL,
      { inputs: `Generate a ${locale} recipe for: ${descriptionDto}` },
      {
        headers: {
          Authorization: `Bearer ${this.API_KEY}`,
        },
      },
    );
    const generatedText = response.data[0]?.generated_text || 'No result';

    // You may need to parse generatedText to fill RecipeDto fields properly.
    // Here is a simple example assuming RecipeDto has a 'description' field.
    return {
      description: generatedText,
      // Add other fields as required by RecipeDto
    } as RecipeDto;
  }
}
