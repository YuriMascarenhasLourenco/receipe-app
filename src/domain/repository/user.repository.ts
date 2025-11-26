import { CreateUserDto } from 'src/application/dtos/create-user.dto';
import { updateUserDto } from 'src/application/dtos/update-user.dto';
import { UserDto } from 'src/application/dtos/user.dto';

export interface UserRepository {
  create(user: CreateUserDto): Promise<UserDto>;
  update(user: updateUserDto): Promise<UserDto | null>;
  delete(id: number): Promise<void>;
  getMe(id: number): Promise<UserDto | null>;
  findLogedUser(email: string, password: string): Promise<UserDto | null>;
}
