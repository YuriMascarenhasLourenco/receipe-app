import { Inject, Injectable } from '@nestjs/common';

import { LoginDto } from '../dtos/login-user.dto';
import { IAuthService } from 'src/domain/auth/auth.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
  ) {}

  async execute(user: LoginDto): Promise<{ access_token: string }> {
    return await this.authService.login(user);
  }
}
