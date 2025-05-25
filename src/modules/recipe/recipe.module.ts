import { Module } from '@nestjs/common';
import { RecipeController } from './presentation/controller/recipe.controller';

@Module({
  imports: [],
  controllers: [RecipeController],
  providers: [],
})
export class RecipeModule {}
