import { IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UserDto extends CreateUserDto {
  @IsNumber()
  id: number;

  constructor(id: number, username: string, email: string, password: string) {
    super(username, password, email);
  }
}
