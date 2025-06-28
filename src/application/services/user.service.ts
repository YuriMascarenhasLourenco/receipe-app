import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/domain/repository/user.repository';
import { UserORMEntity } from 'src/infrastructure/database/typeorm/user.orm-entity';
import { UserMapper } from 'src/infrastructure/mappers/user.mapper';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}
  async getUserDetails(userId: number): Promise<UserORMEntity | null> {
    return this.userRepo.getMe(userId);
  }
  async updateUserDetails(
    userId: number,
    userData: Partial<User>,
  ): Promise<UserORMEntity | null> {
    const user = await this.userRepo.getMe(userId);
    if (!user) {
      return null;
    }
    user.username = userData.username || user.username;
    user.email = userData.email || user.email;
    user.password = userData.password || user.password; // Consider hashing the password before saving
    user.updatedAt = new Date(); // Update the timestamp
  }
  async deleteUser(userId: number): Promise<void> {
    // Logic to delete a user from the database or another service
    const user = await this.userRepo.getMe(userId);
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepo.delete(userId);
  }
  async createUser(userInfo: User): Promise<UserDto | null> {
    const userData = UserMapper.toOrmEntity(userInfo);
    const createdUser = await this.userRepo.create(userData);
    if (!createdUser) {
      throw new Error('User creation failed');
    }
    return createdUser;
  }
}
