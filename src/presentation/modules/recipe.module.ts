import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeORMEntity } from 'src/infrastructure/database/typeorm/recipe.orm-entity';
import { RecipeController } from '../controllers/recipe.controller';
import { RecipeUseCase } from 'src/application/use-cases/recipe.use-case';
import { RecipeService } from 'src/application/services/recipe.service';
import { RecipeRepositoryImpl } from 'src/infrastructure/database/repositories/recipe.repository-impl';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeORMEntity])],
  controllers: [RecipeController],
  providers: [
    RecipeUseCase,
    RecipeService,
    {
      provide: 'RecipeRepository',
      useClass: RecipeRepositoryImpl,
    },
    RecipeRepositoryImpl,
  ],
  exports: [],
})
export class RecipeModule {}
