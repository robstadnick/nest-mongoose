import { Module } from '@nestjs/common';
import { MailGunService } from './mail-gun.service';

@Module({
  providers: [ MailGunService ],
  exports: [ MailGunService ]
})
export class MailGunModule {}
