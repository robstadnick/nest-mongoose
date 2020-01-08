import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
// import { databaseProviders } from './mongo-database.provider';
// import { MongooseConfigService } from './mongo-database.config.service';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            // imports: [MongoDatabaseConfigModule],
            // useFactory: async (mongooseConfigService: MongooseConfigService) => ({
            useFactory: async () => (
                { uri: process.env.MONGO_URI, useNewUrlParser: true, useUnifiedTopology: true }
                // uri: mongooseConfigService.getString(), useNewUrlParser: true
            ),
            // inject: [MongooseConfigService]
        }),
    ],
    providers: [

    ],
    exports: [

    ],
})

export class MongoDatabaseModule {

}
