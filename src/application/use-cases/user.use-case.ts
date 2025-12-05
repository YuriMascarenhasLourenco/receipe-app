import { UserDto } from '../dtos/user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/interfaces/repository/user.repository';
import { updateUserDto } from '../dtos/update-user.dto';
@Injectable()
export class UserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userService: UserRepository,
  ) { }

  async registerUser(userData: CreateUserDto): Promise<UserDto | null> {
    const savedUser = await this.userService.create(userData);
    if (!savedUser) {
      throw new Error('User registration failed');
    }
    return savedUser;
  }

  async loginUser(credentials: any): Promise<any> {
    return { message: 'User logged in successfully', credentials };
  }
  async getUserProfile(userId: number): Promise<UserDto | null> {
    const user = await this.userService.getMe(userId);
    if (!user) {
      return null;
    }
    return user;
  }
  async updateUserProfile(userData: updateUserDto): Promise<UserDto | null> {
    const user = await this.userService.getMe(Number(userData.id));
    if (!user) {
      throw new Error('User not found');
    }
    return await this.userService.update(userData);
  }
  async deleteUser(userId: number): Promise<void> {
    await this.userService.delete(userId);
  }
}
