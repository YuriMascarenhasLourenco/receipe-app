import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserORMEntity } from 'src/infrastructure/database/typeorm/user.orm-entity';
import { UserController } from '../controllers/user.controller';
import { UserUseCase } from 'src/application/use-cases/user.use-case';
import { UserService } from 'src/application/services/user.service';
import { UserRepositoryImpl } from 'src/infrastructure/database/repositories/user.repository-impl';

@Module({
  imports: [TypeOrmModule.forFeature([UserORMEntity])],
  controllers: [UserController],
  providers: [
    UserUseCase,
    UserService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
    UserRepositoryImpl,
  ],
  exports: [UserService],
})
export class UserModule {}
