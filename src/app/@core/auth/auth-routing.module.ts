import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbAuthComponent, NbLoginComponent, NbLogoutComponent, NbRegisterComponent, NbRequestPasswordComponent, NbResetPasswordComponent } from '@nebular/auth';
import { CustomLoginComponent } from './login/login.component';
import { NgxResetPasswordComponent } from './reset-password/reset-password.component';
import { NbxLogoutComponent } from './logout/logout.component';
import { IeBlockerComponent } from './ie-blocker/ie-blocker.component';

export const routes: Routes = [
    {
        path: '',
        component: NbAuthComponent,
        children: [
            {
                path: '',
                component: NbLoginComponent,
            },
            {
                path: 'login',
                component: CustomLoginComponent,
            },
            {
                path: 'ie',
                component: IeBlockerComponent,
            },
            // {
            //     path: 'register',
            //     component: NbRegisterComponent,
            // },
            {
                path: 'logout',
                component: NbxLogoutComponent,
            },
            // {
            //     path: 'logout',
            //     component: NbLogoutComponent,
            // },
            {
                path: 'request-password',
                component: NbRequestPasswordComponent,
            },
            {
                path: 'reset-password/:reset_password_token',
                component: NgxResetPasswordComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}