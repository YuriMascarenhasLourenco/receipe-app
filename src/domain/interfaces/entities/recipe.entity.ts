import { User } from './user.entity';

export class Recipe {
  constructor(
    public id: number,
    public title: string,
    public ingredients: string,
    public instructions: string,
    public createdAt: Date,
    public updatedAt?: Date,
    public user?: User,
  ) {}
}
