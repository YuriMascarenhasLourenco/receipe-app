export abstract class AiServiceInterface {
  abstract chat(message: string): Promise<string>;
}
