import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/typeorm/database.module';
import { ConfigModule } from '@nestjs/config';
import { RecipeModule } from './presentation/modules/recipe.module';
import { UserModule } from './presentation/modules/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './infrastructure/auth/jwt/jwt.guard';
import { AuthModule } from './presentation/modules/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    DatabaseModule,
    RecipeModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
