import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
// import { databaseProviders } from './mongo-database.provider';
import { AngularModule } from '../angular.provider';
// import { MongooseConfigService } from './mongo-database.config.service';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async () => (
                { uri: process.env.MONGO_URI,  useNewUrlParser: true  }
            ),
        }),
    ],
    providers: [

    ],
    exports: [

    ],
})

export class MongoDatabaseModule {

 }
