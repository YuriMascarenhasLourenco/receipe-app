import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.orm-entity';
import { User } from './user.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or your preferred database type
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Recipe, User],
      synchronize: true, // set to false in production
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
