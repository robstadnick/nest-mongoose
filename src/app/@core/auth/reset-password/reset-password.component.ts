
import { NbResetPasswordComponent, NbAuthResult, NB_AUTH_OPTIONS, NbAuthService, getDeepFromObject } from '@nebular/auth';
import { ActivatedRoute } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'ngx-reset-pass',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})

export class NgxResetPasswordComponent implements OnInit {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  token: any

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected router: Router,
              private route: ActivatedRoute) {

    this.redirectDelay = this.getConfigValue('forms.resetPassword.redirectDelay');
    this.showMessages = this.getConfigValue('forms.resetPassword.showMessages');
    this.strategy = this.getConfigValue('forms.resetPassword.strategy');
  }

  ngOnInit(){
    this.route.params.subscribe((params) => {
        this.token = params['reset_password_token']
        this.user.token = this.token
        // console.log()
      });
  }

  resetPass(): void {
      // console.log(this.user)
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.resetPassword(this.strategy, this.user)
    .subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
            this.submitted = false;
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}