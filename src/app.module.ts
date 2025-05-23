import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    TypeOrmModule,
    LoggerModule,
    ExceptionsModule,
    RepositoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
