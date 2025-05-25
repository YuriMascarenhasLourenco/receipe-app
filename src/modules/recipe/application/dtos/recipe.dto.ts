export class RecipeDto {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  locale: string;
  createdAt: Date;

  constructor(
    id: number,
    title: string,
    description: string,
    ingredients: string[],
    instructions: string,
    locale: string,
    createdAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.locale = locale;
    this.createdAt = createdAt;
  }
}
