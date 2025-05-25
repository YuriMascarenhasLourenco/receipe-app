import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
// import your entity here, e.g. import { Recipe } from './recipe.entity';
import { RecipeModule } from './modules/recipe/recipe.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), RecipeModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
