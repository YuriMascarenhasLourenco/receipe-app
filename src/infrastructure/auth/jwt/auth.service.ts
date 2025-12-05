import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/application/dtos/user.dto';
import { AuthInterface } from 'src/domain/interfaces/auth/auth.interface';
import { UserRepository } from 'src/domain/interfaces/repository/user.repository';

@Injectable()
export class JwtAuthService implements AuthInterface {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('UserRepository') private readonly usersRepository: UserRepository,
  ) { }

  async validateUser(email: string, password: string): Promise<UserDto | null> {
    const user = await this.usersRepository.findbyEmail(email);
    if (!user) return null;
    const matches = await this.usersRepository.comparePassword(
      password,
      user.password,
    );
    if (!matches) return null;

    return user;
  }

  async login(user: UserDto): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
