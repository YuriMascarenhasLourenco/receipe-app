import { LoginDto } from 'src/application/dtos/login-user.dto';
import { UserDto } from 'src/application/dtos/user.dto';
export interface AuthInterface {
  validateUser(email: string, password: string): Promise<UserDto | null>;
  login(user: LoginDto): Promise<{ access_token: string }>;
}
