import { Module } from '@nestjs/common';
import { connection } from './database.provider';

@Module({
  providers: [...connection],
  exports: [...connection],
})
export class DatabaseModule {}
