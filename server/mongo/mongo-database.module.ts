import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AngularModule } from '../angular.provider';
import { ServerSideRenderingModule } from './server-side-rendering/server-side-rendering.module'

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async () => (
                { uri: process.env.MONGO_URI,  useNewUrlParser: true  }
            ),
        }),
        ServerSideRenderingModule,
    ],
    providers: [

    ],
    exports: [

    ],
})

export class MongoDatabaseModule {

 }
