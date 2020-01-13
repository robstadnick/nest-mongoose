import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbIconModule
} from '@nebular/theme';

import { CustomLoginComponent } from './login/login.component'
import { NgxResetPasswordComponent } from './reset-password/reset-password.component';
import { NbxLogoutComponent } from './logout/logout.component';
import { IeBlockerComponent } from './ie-blocker/ie-blocker.component';
import { AuthUserService } from '../../shared/services/user.service';
import { NbComponentsModule } from 'src/app/app-nb-components';
import { ThemeModule } from 'src/app/@theme/theme.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ThemeModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbIconModule,
    NbComponentsModule,
    NgxAuthRoutingModule,
    NbAuthModule,
  ],
  declarations: [
    CustomLoginComponent,
    NbxLogoutComponent,
    NgxResetPasswordComponent,
    IeBlockerComponent,
  ],
  // providers:[
  //   AuthService
  // ]
})
export class AuthModule {
}