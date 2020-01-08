import { NgModule } from '@angular/core';

import {
  NbAlertModule,
  NbSpinnerModule,
  NbInputModule,
  NbSelectModule,
  NbActionsModule,
  NbCardModule,
  NbButtonModule,
  NbTooltipModule,
  NbPopoverModule,
  NbListModule,
  NbTabsetModule,
  NbStepperModule,
  NbDatepickerModule,
  NbAccordionModule,
  NbBadgeModule,
  NbUserModule,
  NbIconModule,
  NbContextMenuModule,
  NbMenuModule,
  NbCheckboxModule
//   NbIconComponent,
} from '@nebular/theme';

const Modules = [
  NbAlertModule,
  NbSelectModule,
  NbInputModule,
  NbSpinnerModule,
  NbActionsModule,
  NbCardModule,
  NbButtonModule,
  NbTooltipModule,
  NbPopoverModule,
  NbListModule,
  NbTabsetModule,
  NbStepperModule,
  NbDatepickerModule,
  NbAccordionModule,
  NbBadgeModule,
  NbUserModule,
  NbIconModule,
  NbContextMenuModule,
  NbMenuModule,
  NbCheckboxModule
//   NbIconComponent,
];

@NgModule({
  imports: [
   ...Modules
  ],
  declarations: [
  ],
  providers: [

  ],
  exports: [
    ...Modules
  ]
})
export class NbComponentsModule {
}
