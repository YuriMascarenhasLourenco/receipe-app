import { CreateUserDto } from 'src/application/dtos/create-user.dto';
import { UserDto } from 'src/application/dtos/user.dto';
import { UserORMEntity } from 'src/infrastructure/database/typeorm/user.orm-entity';

export interface UserRepository {
  create(user: CreateUserDto): Promise<UserDto>;
  update(id: number, user: CreateUserDto): Promise<UserDto | null>;
  delete(id: number): Promise<UserORMEntity | null>;
  getMe(id: number): Promise<UserORMEntity | null>;
}
