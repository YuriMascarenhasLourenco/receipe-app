import { Inject, Injectable } from '@nestjs/common';
import { IAuthService } from 'src/domain/auth/auth.interface';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
  ) {}

  async execute(email: string, password: string): Promise<UserDto | null> {
    console.log('email:', email, 'password:', password);
    return await this.authService.validateUser(email, password);
  }
}
