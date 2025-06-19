import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/typeorm/database.module';

@Module({
  imports: [DatabaseModule],
})
export class AppModule {}
