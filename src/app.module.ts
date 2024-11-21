import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ClipboardModule } from './clipboard/clipboard.module';

@Module({
  imports: [DatabaseModule, ClipboardModule],
  providers: [],
})
export class AppModule {}
