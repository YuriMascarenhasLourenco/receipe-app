import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserORMEntity } from 'src/infrastructure/database/typeorm/user.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserORMEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class UserModule {}
