import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/domain/repository/user.repository';
import { UserORMEntity } from '../typeorm/user.orm-entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserORMEntity)
    private readonly ormRepo: Repository<UserORMEntity>,
  ) {}
  async create(user: UserORMEntity): Promise<UserORMEntity> {
    return this.ormRepo.save(user);
  }
  async getMe(id: number): Promise<UserORMEntity | null> {
    return this.ormRepo.findOne({ where: { id } });
  }
  async delete(id: number): Promise<UserORMEntity | null> {
    const existingUser = await this.ormRepo.findOne({ where: { id } });
    if (!existingUser) {
      return null;
    }
    await this.ormRepo.remove(existingUser);
    return existingUser;
  }
  async update(id: number, user: UserORMEntity): Promise<UserORMEntity | null> {
    const existingUser = await this.ormRepo.findOne({ where: { id } });
    if (!existingUser) {
      return null;
    }
    existingUser.username = user.username;
    existingUser.email = user.email;
    existingUser.password = user.password;
    await this.ormRepo.save(existingUser);
    return existingUser;
  }
}
