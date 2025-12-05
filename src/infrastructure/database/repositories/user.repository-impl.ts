import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/domain/interfaces/repository/user.repository';
import { UserORMEntity } from '../typeorm/user.orm-entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/application/dtos/create-user.dto';
import { UserDto } from 'src/application/dtos/user.dto';
import { plainToInstance } from 'class-transformer';
import { UserMapper } from 'src/infrastructure/mappers/user.mapper';
import * as bcrypt from 'bcrypt';
import { i18nValidationMessage } from 'nestjs-i18n';
import { updateUserDto } from 'src/application/dtos/update-user.dto';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserORMEntity)
    private readonly ormRepo: Repository<UserORMEntity>,
  ) { }
  async create(user: CreateUserDto): Promise<UserDto> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const userWithHashedPassword = { ...user, salt, password: hashedPassword };
    const userOrmEntity = UserMapper.fromcreateDtoToOrm(userWithHashedPassword);
    const savedUser = await this.ormRepo.save(userOrmEntity);
    return UserMapper.toDto(savedUser); // Sempre converta para DTO antes de retornar
  }
  async getMe(id: number): Promise<UserDto | null> {
    const userDetails = await this.ormRepo.findOne({ where: { id } });
    if (!userDetails) {
      throw new HttpException(
        i18nValidationMessage('validation.userNotFound'),
        404,
      );
    }
    const detailsDto = UserMapper.toDto(userDetails);
    return detailsDto;
  }
  async delete(id: number): Promise<void> {
    const existingUser = await this.ormRepo.findOne({ where: { id } });
    if (!existingUser) {
      throw new HttpException(
        i18nValidationMessage('validation.userNotFound'),
        HttpStatus.NOT_FOUND,
      );
    }
    await this.ormRepo.remove(existingUser);
  }
  async update(user: updateUserDto): Promise<UserDto | null> {
    const existingUser = await this.ormRepo.findOne({ where: { id: user.id } });
    if (!existingUser) {
      throw new HttpException(
        i18nValidationMessage('validation.userNotFound'),
        404,
      );
    }
    existingUser.username = user.name;
    existingUser.email = user.email;
    existingUser.password = user.password;
    await this.ormRepo.save(existingUser);
    const updatedUser = plainToInstance(UserDto, existingUser);
    return updatedUser;
  }
  async findbyEmail(email: string): Promise<UserDto | null> {
    const findByEmail = await this.ormRepo.findOneBy({ email });
    if (!findByEmail) {
      throw new HttpException(
        i18nValidationMessage('validation.userNotFound'),
        404,
      );
    }

    return UserMapper.toDto(findByEmail);
  }
  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
