import { DataSource, Repository } from "typeorm";
import { Clipboard } from "./clipboard.entity";
import { Provider } from "@nestjs/common";

const ClipboardRepository: Provider<Repository<Clipboard>> = {
    provide: 'CLIPBOARD_REPOSITORY',
    useFactory: async (dataSource: DataSource) => {
        return dataSource.getRepository(Clipboard)
    },
    inject: ['DATA_SOURCE']
} 

export const ClipboardProviders = [ClipboardRepository];