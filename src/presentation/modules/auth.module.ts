import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { LoginUseCase } from 'src/application/use-cases/login.use-case';
import { ValidateUserUseCase } from 'src/application/use-cases/validate.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/jwt/jwt.strategy';
import { JwtAuthService } from 'src/infrastructure/auth/jwt/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    ValidateUserUseCase,
    JwtStrategy,
    {
      provide: 'IAuthService',
      useClass: JwtAuthService,
    },
  ],
})
export class AuthModule {}
