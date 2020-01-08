import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './dashboard-menu';

@Component({
  selector: 'app-dashboard',
  template: ` <ngx-one-column-layout>
  <nb-menu [items]="menu"></nb-menu>
  <router-outlet></router-outlet>
</ngx-one-column-layout>`,
  styles: []
})
export class DashboardComponent implements OnInit {

  menu = MENU_ITEMS;
  constructor() { }

  ngOnInit() {
  }

}
