import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/domain/repository/user.repository';
import { UserORMEntity } from '../typeorm/user.orm-entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/application/dtos/create-user.dto';
import { UserDto } from 'src/application/dtos/user.dto';
import { plainToInstance } from 'class-transformer';
import { UserMapper } from 'src/infrastructure/mappers/user.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserORMEntity)
    private readonly ormRepo: Repository<UserORMEntity>,
  ) {}
  async create(user: CreateUserDto): Promise<UserDto> {
    const userOrmEntity = UserMapper.fromcreateDtoToOrm(user);
    const savedUser = await this.ormRepo.save(userOrmEntity);
    return UserMapper.toDto(savedUser); // Sempre converta para DTO antes de retornar
  }
  async getMe(id: number): Promise<UserDto | null> {
    const userDetails = await this.ormRepo.findOne({ where: { id } });
    if (!userDetails) {
      return null;
    }
    const detailsDto = UserMapper.toDto(userDetails);
    return detailsDto;
  }
  async delete(id: number): Promise<void> {
    const existingUser = await this.ormRepo.findOne({ where: { id } });
    if (!existingUser) {
      return null;
    }
    await this.ormRepo.remove(existingUser);
  }
  async update(id: number, user: UserDto): Promise<UserDto | null> {
    const existingUser = await this.ormRepo.findOne({ where: { id } });
    if (!existingUser) {
      return null;
    }
    existingUser.username = user.username;
    existingUser.email = user.email;
    existingUser.password = user.password;
    await this.ormRepo.save(existingUser);
    const updatedUser = plainToInstance(UserDto, existingUser);
    return updatedUser;
  }
}
