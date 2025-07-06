import { Injectable } from '@nestjs/common';
import { AzureKeyCredential } from '@azure/core-auth';
import ModelClient, { isUnexpected } from '@azure-rest/ai-inference';
import { AiServiceInterface } from 'src/domain/services/huggingface.service';

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

  async chat(userMessage: string): Promise<string> {
    const response = await this.client.path('/chat/completions').post({
      body: {
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'Você é um assistente útil para buscar receitas.',
          },
          {
            role: 'user',
            content: `Quero que você me dê uma receita de ${userMessage} com a formatação de titulo indredientes e instruções`,
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
