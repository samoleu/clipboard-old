import { Module } from '@nestjs/common';
import { DatabaseProviders } from './database.provider'

@Module({
    exports: [ ...DatabaseProviders ],
    providers: [ ...DatabaseProviders ]
})
export class DatabaseModule {}
