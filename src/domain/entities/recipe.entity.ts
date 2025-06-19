export class Recipe {
  constructor(
    public title: string,
    public ingredients: string[],
    public instructions: string,
    public createdAt: Date,
    public updatedAt?: Date,
  ) {}
}
