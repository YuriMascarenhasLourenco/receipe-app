import { Inject, Injectable } from '@nestjs/common';
import { AuthInterface } from 'src/domain/interfaces/auth/auth.interface';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    @Inject('AuthInterface') private readonly authService: AuthInterface,
  ) { }

  async execute(email: string, password: string): Promise<UserDto | null> {
    return await this.authService.validateUser(email, password);
  }
}
