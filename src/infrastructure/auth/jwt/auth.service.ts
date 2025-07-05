import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/application/dtos/user.dto';
import { UserService } from 'src/application/services/user.service';
import { IAuthService } from 'src/domain/auth/auth.interface';

@Injectable()
export class JwtAuthService implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto | null> {
    const user = await this.usersService.findUser(email, password);
    console.log('user:', user);
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: UserDto): Promise<{ access_token: string }> {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
