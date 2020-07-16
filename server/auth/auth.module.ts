import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AwsModule } from '../services/aws/aws.module';
// import { PassportModule } from '@nestjs/passport';
import { VerifyEmailService } from './services/verify.email.service';
import { UserModule } from '../modules/users/user.module';
import { MailGunModule } from '../services/mail-gun/mail-gun.module';
// import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    VerifyEmailService,
    // JwtStrategy
  ],
  imports: [
    UserModule,
    AwsModule,
    MailGunModule
    // PassportModule.register({
    //   defaultStrategy: 'jwt'
    // }),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: {
    //     expiresIn: '1 days'
    //   }
    // }),
  ],
  exports: [
    // JwtStrategy,
    // PassportModule
  ]
})
export class AuthModule { }
