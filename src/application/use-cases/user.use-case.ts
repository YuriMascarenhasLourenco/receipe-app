import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserORMEntity } from 'src/infrastructure/database/typeorm/user.orm-entity';
import { User } from 'src/domain/entities/user.entity';

Injectable();
export class UserUseCase {
  // This class can be used to implement user-related use cases
  // For example, user registration, login, profile management, etc.

  constructor(private readonly userService: UserService) {
    // Replace 'any' with the actual user service type
  }

  async registerUser(userData: any): Promise<any> {
    // Implement user registration logic here
    return { message: 'User registered successfully', userData };
  }

  async loginUser(credentials: any): Promise<any> {
    // Implement user login logic here
    return { message: 'User logged in successfully', credentials };
  }
  async getUserProfile(userId: string): Promise<UserORMEntity | null> {
    // Implement logic to retrieve user profile
    return this.userService.getUserDetails(Number(userId));
  }
  async updateUserProfile(
    userId: string,
    userData: User,
  ): Promise<UserORMEntity | null> {
    const user = await this.userService.getUserDetails(Number(userId));
    if (!user) {
      throw new Error('User not found');
    }
    this.userService.updateUserDetails(Number(userId), userData);
    return null;
  }
}
