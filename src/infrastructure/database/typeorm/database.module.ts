import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeORMEntity } from './recipe.orm-entity';
import { UserORMEntity } from './user.orm-entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // importa aqui também
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        synchronize: true,
        entities: [RecipeORMEntity, UserORMEntity], // adicione suas entidades aqui
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
