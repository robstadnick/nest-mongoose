/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
declare global {
  interface Window { Intercom: any; }
}

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {


  constructor(
    private authService: NbAuthService,
    private _router: Router,
  ) {

  }

  ngOnInit(): void {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {

      } else {
        console.log('This Token Is Not Valid');
        // this._router.navigate(['auth']);
        // this._router.navigate(['/commercial-trucking/dashboard']);

      }
    });
    this.isIE()
    // window.Intercom('update', {  });
  }

  private isIE() {
    const match = navigator.userAgent.search(/(?:MSIE|Trident\/.*; rv:)/);
    let isIE = false;
    if (match !== -1) {
      isIE = true;
      // console.log(isIE)
      this._router.navigate(['/auth/ie'])
    }
  }
}