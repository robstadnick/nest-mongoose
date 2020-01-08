import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">All Rights Reserved Street Parking Inc by <b> <a href="" target="_blank">Rob Stadnick</a> </b> {{year | date : 'yyyy'}}</span>

  `,
})
export class FooterComponent {
  year: Date = new Date()

//Footer Links
//   <div class="socials">
//   <a href="#" target="_blank" class="ion ion-social-github"></a>
//   <a href="#" target="_blank" class="ion ion-social-facebook"></a>
//   <a href="#" target="_blank" class="ion ion-social-twitter"></a>
//   <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
// </div>
}
