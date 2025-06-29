import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/application/dtos/create-user.dto';
import { UserDto } from 'src/application/dtos/user.dto';
import { UserUseCase } from 'src/application/use-cases/user.use-case';

@Controller('user')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}
  @Post('/new')
  async createUser(@Body() User: CreateUserDto): Promise<UserDto | null> {
    return this.userUseCase.registerUser(User);
  }
  @Post('/login')
  async loginUser(@Body() credentials: any): Promise<any> {
    return this.userUseCase.loginUser(credentials);
  }

  @Post('/profile/:id')
  async getUserProfile(@Body('id') userId: string): Promise<UserDto | null> {
    return this.userUseCase.getUserProfile(userId);
  }

  @Post('/update/:id')
  async updateUserProfile(
    @Body('id') userId: string,
    @Body() userData: UserDto,
  ): Promise<UserDto | null> {
    return this.userUseCase.updateUserProfile(userId, userData);
  }
}
