import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/database/typeorm/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RecipeModule } from './recipe.module';
import { UserModule } from './user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt/jwt.guard';
import { AuthModule } from './auth.module';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    RecipeModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.get('LANGUAGE'),
        loaderOptions: {
          path: path.join(__dirname, '../../infrastructure/i18n'),
        },
      }),
      inject: [ConfigService],
      resolvers: [
        { use: AcceptLanguageResolver, options: ['accept-language'] },
        new QueryResolver(['lang']),
        new AcceptLanguageResolver(), // <- NORMALIZA en-US → en
      ],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
