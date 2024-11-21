import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ClipboardService } from './clipboard.service';
import { ClipboardProviders } from './clipboard.providers';
import { ClipboardController } from './clipboard.controller';

@Module({
    imports: [ DatabaseModule ],
    providers: [ClipboardService, ...ClipboardProviders],
    controllers: [ClipboardController]
})
export class ClipboardModule {}