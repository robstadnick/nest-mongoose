import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { MongoDatabaseModule } from './mongo/mongo-database.module';

const domino = require('domino');
const win = domino.createWindow();

// tslint:disable: no-string-literal
global['window'] = win;
global['document'] = win.document;
global['navigator'] = win.navigator;
global['CSS'] = undefined;
global['Event'] = undefined;
global['localStorage'] = undefined;
global['getItem'] = undefined;

@Module({
  controllers: [
    AppController
  ],
  imports: [
    MongoDatabaseModule,
    AuthModule,
    UserModule,
  ],
  providers: [
  ]
})
export class ApplicationModule { }
