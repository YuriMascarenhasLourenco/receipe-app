import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from 'src/infrastructure/database/typeorm/recipe.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  controllers: [],
  providers: [],
  exports: [],
})
export class UserModule {}
