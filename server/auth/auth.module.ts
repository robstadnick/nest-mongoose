import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../modules/users/user.module';

@Module({
  controllers: [ AuthController ],
  providers: [ AuthService ],
  imports: [ UserModule ],
})
export class AuthModule { }
