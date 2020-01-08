import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  loading: boolean = false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
  ) {
  }

  ngOnInit() {
    this.title.setTitle('Zeus - Carrier Management');
  }


}
