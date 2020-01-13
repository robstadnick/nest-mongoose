import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IAuthTokenUser } from 'server/mongo/interfaces/users/auth.model';
import { Router } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { AuthUserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly = false;

  user: any
  name: string;
  picture: string;
  auth: any;
  title: string;
  image: string

  themes = [
    {
      value: 'Light',
      name: 'Light',
    },
    {
      value: 'Dark Mode',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'Light';

  userMenu = [{ title: 'Profile' }, { title: 'Log Out' }];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private _router: Router,
    private authService: NbAuthService,
    private _authUserService: AuthUserService
  ) {
  }

  ngOnInit() {
    //TODO: Fix this garbage
    this._authUserService.user
      .subscribe({
        next: (user) => {
          this.user = user;
          this.name = this.user.profile.first_name + ' ' + this.user.profile.last_name;
          this.image = null;
          this.image = this.user.profile.profile_photo_url;
        },
        error: (error) => console.log(error),
      });
    this.currentTheme = this.themeService.currentTheme;
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.menuService.onItemClick()
      .pipe(
        // filter(({ tag }) => tag === 'user-header' ),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        this.title = title;
        this.menuFunction();
      });

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  menuFunction() {
    console.log('menufunction', this.title);
    if (this.title === 'Log Out') {
      console.log('logout function');
      return this._router.navigate(['/auth/logout']);
    }
    if (this.title === 'Profile') {
      return this._router.navigate([`/commercial-trucking/user/detail/${this.user._id}`]);
    }
    // if(this.title == 'Employee Contract'){
    //   return this._router.navigate(['/commercial-trucking/hr/onboarding'])
    // }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    // this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
