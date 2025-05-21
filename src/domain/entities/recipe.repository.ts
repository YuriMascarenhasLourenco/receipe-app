export class Recipe {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly ingredients: string[],
    public readonly instructions: string,
    public readonly locale: string,
    public readonly createdAt: Date = new Date(),
    public readonly id?: number,
  ) {}

  isInternational(): boolean {
    return this.locale !== 'en';
  }
}
