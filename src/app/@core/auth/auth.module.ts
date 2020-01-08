import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { AuthUserService } from '../../@theme/user.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbIconModule,
    NgxAuthRoutingModule,
    NbAuthModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },
          baseEndpoint: '/api',
          login: {
            endpoint: '/auth/sign-in',
            method: 'post',
          },
          // register: {
          //   endpoint: '/auth/sign-up',
          //   method: 'post',
          // },
          logout: {
            endpoint: '/auth/sign-out',
            method: 'post',
          },
          requestPass: {
            endpoint: '/auth/request-pass',
            method: 'post',
          },
          resetPass: {
            endpoint: '/auth/reset-pass',
            method: 'post',
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 1500,
          showMessages: {
            success: true,
          },
        },
        // register: {
        //   redirectDelay: 0,
        //   showMessages: {
        //     success: true,
        //   },
        // },
        requestPassword: {
          redirectDelay: 0,
          showMessages: {
            success: true,
          },
        },
        resetPassword: {
          redirectDelay: 0,
          showMessages: {
            success: true,
          },
        },
        logout: {
          redirectDelay: 0,
        },
      },
    }),
  ],
  declarations: [
    CustomLoginComponent,
    NbxLogoutComponent,
    NgxResetPasswordComponent,
    IeBlockerComponent
  ],
})
export class AuthModule {
}