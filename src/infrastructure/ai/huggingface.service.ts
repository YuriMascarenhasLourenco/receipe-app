import { Injectable } from '@nestjs/common';
import { AzureKeyCredential } from '@azure/core-auth';
import ModelClient, { isUnexpected } from '@azure-rest/ai-inference';
import { AiServiceInterface } from 'src/domain/services/huggingface.service';
import { CreateRecipeDto } from 'src/application/dtos/create-recipe.dto';
import { Language } from 'src/domain/common/language.common';

@Injectable()
export class GithubAiService implements AiServiceInterface {
  private readonly client;
  private readonly model: string;

  constructor() {
    const endpoint = process.env['GH_AI_ENDPOINT'];
    const token = process.env['GITHUB_TOKEN'];
    this.model = process.env['GH_AI_MODEL'];

    if (!endpoint || !token || !this.model) {
      throw new Error('Parâmetros de IA não configurados corretamente');
    }

    this.client = ModelClient(endpoint, new AzureKeyCredential(token));
  }

  async chat(userMessage: CreateRecipeDto, lang: Language): Promise<string> {
    const response = await this.client.path('/chat/completions').post({
      body: {
        model: this.model,
        messages: [
          {
            role: 'system',
            content: `Você é um assistente útil para buscar receitas.Escreva as respostas no idioma ${lang}.`,
          },
          {
            role: 'user',
            content: `Quero que você busque uma receita baseada no nome que eu fornecer. Retorne exclusivamente um JSON no seguinte formato:

        {
        "name": string,
        "ingredients": string,
        "instructions": string
        }

        O campo ingredients deve conter a lista de ingredientes em texto corrido ou lista; o campo instructions deve conter o passo a passo completo.
        Não adicione comentários, explicações, texto fora do JSON ou campos extras. Apenas o JSON final.
        A receita a ser buscada é: ${userMessage.title}`,
          },
        ],
        temperature: 1,
        top_p: 1,
      },
    });

    if (isUnexpected(response)) {
      throw new Error(response.body.error.message);
    }

    return response.body.choices[0].message.content;
  }
}
