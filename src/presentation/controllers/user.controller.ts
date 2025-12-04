import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/application/dtos/create-user.dto';
import { updateUserDto } from 'src/application/dtos/update-user.dto';
import { UserDto } from 'src/application/dtos/user.dto';
import { UserUseCase } from 'src/application/use-cases/user.use-case';
import { Public } from 'src/infrastructure/auth/decorators/public.decorator';

@ApiHeader({
  name: 'Accept-Language',
  description:
    'Language preference for the response. Supported values: en (English), pt (Portuguese). Default is en.',
  required: false,
})
@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}
  @Public()
  @Post('/new')
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a new user in the system.',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido ou não fornecido.',
  })
  async createUser(@Body() User: CreateUserDto): Promise<UserDto | null> {
    return this.userUseCase.registerUser(User);
  }

  @ApiBearerAuth('access-token')
  @Get('/profile/:id')
  @ApiOperation({
    summary: 'Get user profile',
    description: 'Retrieves the profile information of a user by their ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'The user profile has been successfully retrieved.',
    type: UserDto,
  })
  @ApiResponse({
    status: 401,
    description: 'invalid token or not provided.',
  })
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
  @ApiOperation({
    summary: 'Update user profile',
  })
  @ApiResponse({
    status: 200,
    description: 'The user profile has been successfully updated.',
    type: UserDto,
  })
  @ApiResponse({
    status: 404,
    description: 'user not found.',
  })
  async updateUserProfile(
    @Body() userData: updateUserDto,
  ): Promise<UserDto | null> {
    return this.userUseCase.updateUserProfile(userData);
  }

  @ApiBearerAuth('access-token')
  @Delete('/delete/:id')
  @ApiOperation({
    summary: 'Delete user',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'user not found.',
  })
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
