import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UserUseCase {
  // This class can be used to implement user-related use cases
  // For example, user registration, login, profile management, etc.

  constructor(private readonly userService: UserService) {
    // Replace 'any' with the actual user service type
  }

  async registerUser(userData: CreateUserDto): Promise<UserDto | null> {
    const savedUser = await this.userService.createUser(userData);
    if (!savedUser) {
      throw new Error('User registration failed');
    }
    return savedUser;
  }

  async loginUser(credentials: any): Promise<any> {
    // Implement user login logic here
    return { message: 'User logged in successfully', credentials };
  }
  async getUserProfile(userId: string): Promise<UserDto | null> {
    const user = await this.userService.getUserDetails(Number(userId));
    if (!user) {
      return null;
    }
    return user;
  }
  async updateUserProfile(
    userId: string,
    userData: UserDto,
  ): Promise<UserDto | null> {
    const user = await this.userService.getUserDetails(Number(userId));
    if (!user) {
      throw new Error('User not found');
      return null;
    }
    return await this.userService.updateUserDetails(Number(userId), userData);
  }
}
