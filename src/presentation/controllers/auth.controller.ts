import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/application/dtos/login-user.dto';
import { LoginUseCase } from 'src/application/use-cases/login.use-case';
import { ValidateUserUseCase } from 'src/application/use-cases/validate.use-case';
import { Public } from 'src/infrastructure/auth/decorators/public.decorator';
import { LanguageHeader } from '../decorators/language-header.decorator';

@Controller('auth')
@LanguageHeader()
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly validateUserUseCase: ValidateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}
  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description:
      'Authenticates a user and returns a JWT token upon successful login.',
  })
  @ApiBody({
    schema: {
      example: {
        email: 'user@example.com',
        password: '123456',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso.',
    schema: {
      example: {
        access_token: 'jwt-token-here',
        user: {
          id: '1',
          email: 'user@example.com',
          name: 'Pedro Silva',
        },
      },
    },
  })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.validateUserUseCase.execute(
      loginDto.email,
      loginDto.password,
    );

    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    return await this.loginUseCase.execute(user);
  }
}
