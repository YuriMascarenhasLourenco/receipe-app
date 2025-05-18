import { ReceipeM } from '../entities/recipe';

export interface TodoRepository {
  insert(todo: ReceipeM): Promise<void>;
  findAll(): Promise<ReceipeM[]>;
  findById(id: number): Promise<ReceipeM>;
  updateContent(id: number, isDone: boolean): Promise<void>;
  deleteById(id: number): Promise<void>;
}
