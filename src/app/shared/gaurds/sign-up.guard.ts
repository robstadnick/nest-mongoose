import { Injectable, NgZone } from '@angular/core';
import { CanLoad, Router, RouterStateSnapshot, ActivatedRouteSnapshot, Route, UrlSegment, CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthUserService } from 'src/app/shared/services/user.service';

@Injectable({ providedIn: 'root' })
export class SignUpGuard implements CanActivate {

    constructor(
        private router: Router,
        private _authUserService: AuthUserService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this._authUserService.user
            .pipe(
                map((user) => {
                    if (!user.settings.onboarding_complete) {
                        // console.log('Onboarding Not Complete');
                        // this.router.navigate(['/sign-up/about']);
                        return true;
                    }
                    return true;
                })
            );
    }
}

// trialing
// active
// incomplete
// incomplete_expired
// past_due
// canceled
// unpaid
