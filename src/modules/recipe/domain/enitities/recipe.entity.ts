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

  updateTitle(newTitle: string) {
    if (!newTitle || newTitle.length < 3) {
      throw new Error('Title must be at least 3 characters.');
    }
    (this as any).title = newTitle;
  }

  isInternational(): boolean {
    return this.locale !== 'en';
  }
}
