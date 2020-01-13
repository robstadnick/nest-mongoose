import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { NbDatepickerModule, NbDialogModule, NbMenuModule, NbSidebarModule, NbToastrModule, NbWindowModule } from '@nebular/theme';
import { AuthGuard } from './shared/gaurds/auth.guard';
import { AuthModule } from './@core/auth/auth.module';
import { AuthInterceptor } from './@core/auth/interceptors/auth.interceptor';
import { RoleProvider } from './@core/auth/role.provider';
// import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { VerifyEmailModule } from './@core/verify-email/verify-email.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    AuthModule,
    VerifyEmailModule,
    NbSecurityModule.forRoot({
      accessControl: {
        guest: {
          view: ['comments'],
        },
        admin: {
          parent: 'guest',
          view: '*',
          create: '*',
          approve: '*',
          remove: '*',
          apply: '*',
        },
      },
    }),
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
            endpoint: '/auth/set-pass',
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
  providers: [
    {
      provide: NbRoleProvider,
      useClass: RoleProvider,
    },
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
