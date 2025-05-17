import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [EnvironmentConfigModule, TypeOrmModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
