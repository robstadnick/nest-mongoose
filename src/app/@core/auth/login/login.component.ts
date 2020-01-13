import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbAuthService, NbAuthResult, getDeepFromObject, NbAuthSocialLink, NB_AUTH_OPTIONS } from '@nebular/auth';
import { IAuthTokenUser } from '../../../../../server/mongo/interfaces/users/auth.model';
import { AuthUserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'nb-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomLoginComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];
  rememberMe = false;
  returnUrl: string;

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private _authUserService: AuthUserService,
    private route: ActivatedRoute,
  ) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
    this.rememberMe = this.getConfigValue('forms.login.rememberMe');
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        const user = result.getToken().getPayload() as IAuthTokenUser
        this._authUserService.getHttpUser(user)
          .subscribe({
            next: (nuser) => {
              if (nuser) {
                // window.DD_LOGS && DD_LOGS.logger.info('Login', { user: user.email });
                this.messages = result.getMessages();
                const redirect = result.getRedirect();
                if (this.returnUrl) {
                  return this.router.navigateByUrl(this.returnUrl);
                } else if (redirect) {
                  setTimeout(() => {
                    return this.router.navigateByUrl(redirect);
                  }, this.redirectDelay);
                }
                this.cd.detectChanges();
              }
            },
            error: (error) => this.errors = error
          });
      } else {
        this.errors = result.getErrors();
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}