import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/domain/repository/user.repository';
import { UserMapper } from 'src/infrastructure/mappers/user.mapper';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepo: UserRepository,
  ) {}
  async getUserDetails(userId: number): Promise<UserDto | null> {
    const user = await this.userRepo.getMe(userId);
    if (!user) {
      return null;
    }
    return user;
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
    const createUserDto = UserMapper.toOrmEntity(userInfo);
    const createdUser = await this.userRepo.create(createUserDto);
    if (!createdUser) {
      throw new Error('User creation failed');
    }
    return createdUser;
  }

  async updateUserDetails(
    userId: number,
    userData: Partial<UserDto>,
  ): Promise<UserDto | null> {
    const user = await this.userRepo.getMe(userId);
    if (!user) {
      return null;
    }
    // Crie um novo CreateUserDto com os dados atualizados
    return this.userRepo.update(userId, userData);
  }
}
