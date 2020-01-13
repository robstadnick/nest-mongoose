import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { MongoDatabaseModule } from './mongo/mongo-database.module';
import { AwsModule } from './services/aws/aws.module';
import { MailGunModule } from './services/mail-gun/mail-gun.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';

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
    // Modules
    MongoDatabaseModule,
    AuthModule,
    UserModule,

    // Service Modules
    AwsModule,
    MailGunModule
  ],
  providers: [
  ]
})
export class ApplicationModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'api/auth/**', method: RequestMethod.ALL },
      )
      .forRoutes(
        {
          path: 'api/user*',
          method: RequestMethod.ALL
        },
      )
  }
}