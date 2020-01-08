// import { NgModule } from '@angular/core';
// import { SecurityModule } from './security/security.role.module';
// import { AuthModule } from 'server/auth/auth.module';
// import { NbRoleProvider } from '@nebular/security';
// import { RoleProvider } from './auth/role.provider';
// import { APP_BASE_HREF } from '@angular/common';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
// import { AuthGuard } from './auth/auth-guard.service';


// @NgModule({
//   imports: [
//     SecurityModule,
//     AuthModule
//   ],
//   exports: [
//     SecurityModule,
//     AuthModule
//   ],
//   providers: [
//     {
//       provide: NbRoleProvider,
//       useClass: RoleProvider,
//     },
//     { provide: APP_BASE_HREF, useValue: '/' },
//     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
//     AuthGuard
//   ],
// })
// export class CoreModule {
// }