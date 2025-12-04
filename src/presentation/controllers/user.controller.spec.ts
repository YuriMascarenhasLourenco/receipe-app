import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserUseCase } from 'src/application/use-cases/user.use-case';
import { UserRepositoryImpl } from 'src/infrastructure/database/repositories/user.repository-impl';
import { CreateUserDto } from 'src/application/dtos/create-user.dto';

describe('AppController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserUseCase,
        UserRepositoryImpl,
        {
          provide: 'UserRepository',
          useClass: UserRepositoryImpl,
        },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  it('should exist', () => {
    expect(userController).toBeDefined();
  });
  describe('createUser', () => {
    it('should create a user', async () => {
      const user: CreateUserDto = {
        username: 'testuser',
        password: 'Test@1234',
        email: 'nda@gmail.com',
      };

      const result = await userController.createUser(user);
      expect(result).toBeDefined();
      expect(result?.username).toBe(user.username);
      expect(result?.email).toBe(user.email);
    });
    it('should fail to create a user with no username', async () => {
      const user: CreateUserDto = {
        username: '',
        password: 'Test@1234',
        email: 'nda@gmail.com',
      };
      await expect(userController.createUser(user)).rejects.toThrow();
    });
  });
  describe('getUserProfile', () => {
    it('should get user profile', async () => {
      const userId = '1';

      const result = await userController.getUserProfile(userId);
      expect(result).toBeDefined();
      expect(result?.id).toBe(Number(userId));
    });
  });
});
