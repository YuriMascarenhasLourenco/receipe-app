import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeORMEntity } from 'src/infrastructure/database/typeorm/recipe.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeORMEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class RecipeModule {}
