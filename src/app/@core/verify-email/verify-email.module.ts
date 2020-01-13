import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyEmailRoutingModule } from './verify-email-routing.module';
import { VerifyEmailComponent } from './verify-email.component';
import { VerifyEmailCodeComponent } from './verify-email-code/verify-email-code.component';


@NgModule({
  declarations: [VerifyEmailComponent, VerifyEmailCodeComponent],
  imports: [
    CommonModule,
    VerifyEmailRoutingModule
  ]
})
export class VerifyEmailModule { }
