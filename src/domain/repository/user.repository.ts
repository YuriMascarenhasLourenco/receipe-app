import { CreateUserDto } from 'src/application/dtos/create-user.dto';
import { UserDto } from 'src/application/dtos/user.dto';

export interface UserRepository {
  create(user: CreateUserDto): Promise<UserDto>;
  update(id: number, user: Partial<UserDto>): Promise<UserDto | null>;
  delete(id: number): Promise<void>;
  getMe(id: number): Promise<UserDto | null>;
}
