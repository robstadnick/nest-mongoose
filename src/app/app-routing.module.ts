import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './@core/auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../app/pages/pages.module')
      .then(m => m.PagesModule),
      canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./@core/auth/auth.module')
      .then(m => m.AuthModule),
    // loadChildren: './@core/auth/auth.module#AuthModule',
  },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
