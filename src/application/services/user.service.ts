import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/repository/user.repository';
import { UserMapper } from 'src/infrastructure/mappers/user.mapper';
import { UserDto } from '../dtos/user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

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
    const user = await this.userRepo.getMe(userId);
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepo.delete(userId);
  }
  async createUser(userInfo: CreateUserDto): Promise<UserDto | null> {
    const createUserDto = UserMapper.fromcreateDtoToOrm(userInfo);
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
    return this.userRepo.update(userId, userData);
  }
  async findUser(email: string, password: string): Promise<UserDto | null> {
    const user = await this.userRepo.findLogedUser(email, password);
    console.log('userFind:', user);
    if (!user) {
      return null;
    }
    return user;
  }
}
