import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/typeorm/database.module';
import { ConfigModule } from '@nestjs/config';
import { RecipeModule } from './presentation/modules/recipe.module';
import { UserModule } from './presentation/modules/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    RecipeModule,
    UserModule,
  ],
})
export class AppModule {}
