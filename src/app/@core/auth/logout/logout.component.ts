import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NB_AUTH_OPTIONS, NbAuthResult, getDeepFromObject } from '@nebular/auth';
import { AuthUserService } from '../../../@theme/user.service';
declare global {
  interface Window { Intercom: any; }
}
@Component({
  selector: 'nbx-logout',
  templateUrl: './logout.component.html',
})
export class NbxLogoutComponent implements OnInit {

  redirectDelay: number = 0;
  strategy: string = '';

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected router: Router,
    private _authUserService: AuthUserService
  ) {
    this.redirectDelay = this.getConfigValue('forms.logout.redirectDelay');
    this.strategy = this.getConfigValue('forms.logout.strategy');
  }

  ngOnInit(): void {
    this.logout(this.strategy);
  }

  logout(strategy: string): void {
    this.service.logout(strategy).subscribe((result: NbAuthResult) => {
      const redirect = result.getRedirect();
      if (redirect) {
        // window.Intercom('shutdown');
        localStorage.removeItem('currentUser');
        setTimeout(() => {
          // location.reload();
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}