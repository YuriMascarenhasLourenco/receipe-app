import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from 'src/application/dtos/create-user.dto';
import { updateUserDto } from 'src/application/dtos/update-user.dto';
import { UserDto } from 'src/application/dtos/user.dto';
import { UserUseCase } from 'src/application/use-cases/user.use-case';
import { Public } from 'src/infrastructure/auth/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}
  @Public()
  @Post('/new')
  async createUser(@Body() User: CreateUserDto): Promise<UserDto | null> {
    return this.userUseCase.registerUser(User);
  }

  @ApiBearerAuth('access-token')
  @Get('/profile/:id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'User ID',
  })
  async getUserProfile(@Param('id') id: string): Promise<UserDto | null> {
    console.log('userId:', Number(id));
    return this.userUseCase.getUserProfile(Number(id));
  }
  @ApiBearerAuth('access-token')
  @Patch('/update')
  async updateUserProfile(
    @Body() userData: updateUserDto,
  ): Promise<UserDto | null> {
    return this.userUseCase.updateUserProfile(userData);
  }
  @ApiBearerAuth('access-token')
  @Delete('/delete/:id')
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'User ID',
  })
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userUseCase.deleteUser(Number(id));
  }
}
