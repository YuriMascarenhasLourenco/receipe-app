import { Controller } from '@nestjs/common';
import { UserUseCase } from 'src/application/use-cases/user.use-case';

@Controller('user')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}
}
