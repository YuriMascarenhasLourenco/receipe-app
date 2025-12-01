import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/login-user.dto';
import { AuthInterface } from 'src/domain/auth/auth.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('AuthInterface') private readonly authService: AuthInterface,
  ) {}

  async execute(user: LoginDto): Promise<{ access_token: string }> {
    return await this.authService.login(user);
  }
}
