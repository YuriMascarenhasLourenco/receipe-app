import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeORMEntity } from 'src/infrastructure/database/typeorm/recipe.orm-entity';
import { RecipeController } from '../controllers/recipe.controller';
import { RecipeUseCase } from 'src/application/use-cases/recipe.use-case';
import { RecipeService } from 'src/application/services/recipe.service';
import { RecipeRepositoryImpl } from 'src/infrastructure/database/repositories/recipe.repository-impl';
import { TextController } from '../controllers/ai.controller';
import { GenerateTextUseCase } from 'src/application/use-cases/generate-recipe.use-case';
import { GithubAiService } from 'src/infrastructure/ai/huggingface.service';
import { AiServiceInterface } from 'src/domain/services/huggingface.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeORMEntity])],
  controllers: [RecipeController, TextController],
  providers: [
    RecipeUseCase,
    RecipeService,
    GenerateTextUseCase,
    {
      provide: 'AiServiceInterface',
      useClass: GithubAiService,
    },
    {
      provide: 'RecipeRepository',
      useClass: RecipeRepositoryImpl,
    },
  ],
  exports: [],
})
export class RecipeModule {}
