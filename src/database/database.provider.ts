import { DataSource } from "typeorm";
import { Provider } from "@nestjs/common";

const DatabaseProvider: Provider<DataSource> = {
    provide: 'DATA_SOURCE',
    useFactory: () => {
        const dataSource = new DataSource({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'user',
            password: 'mysecretpassword',
            database: 'postgres',
            entities: [
                __dirname + '/../**/*.entity{.ts,.js}'
            ],
            synchronize: true
        })

        return dataSource.initialize()
    }
} 

export const DatabaseProviders = [DatabaseProvider]