import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/application/dtos/login-user.dto';
import { LoginUseCase } from 'src/application/use-cases/login.use-case';
import { ValidateUserUseCase } from 'src/application/use-cases/validate.use-case';
import { Public } from 'src/infrastructure/auth/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly validateUserUseCase: ValidateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.validateUserUseCase.execute(
      loginDto.email,
      loginDto.password,
    );

    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    return await this.loginUseCase.execute(user);
  }
}
