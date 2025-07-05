import { Recipe } from './recipe.entity';

export class User {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public password: string,
    public salt: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public recipes?: Recipe[],
  ) {}
}
