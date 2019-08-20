import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
// import { MongooseModule } from '@nestjs/mongoose';
import { AngularModule } from './angular.provider'
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
  imports: [
    MongoDatabaseModule,
    AuthModule,
    UserModule,
    // AngularModule.asyncAfterLoad() // Contains AngularUniversalModule.forRoot()
    //
    // TODO: UNCOMMENT TO VIEW ISSUE
    // AngularUniversalModule.forRoot({
    //   viewsPath: join(process.cwd(), 'dist/browser'),
    //   bundle: require('../server/main'),
    //   liveReload: true
    // }),
  ],
  providers: [
  ]
})
export class ApplicationModule { }
