import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NbComponentsModule } from 'src/app/app-nb-components';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [DashboardComponent, DashboardHomeComponent],
  imports: [
    CommonModule,
    NbComponentsModule,
    ThemeModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule { }
