import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationWarningComponent } from './warning/warning.component';
import { NbComponentsModule } from 'src/app/app-nb-components';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ConfirmationWarningComponent],
  imports: [
    CommonModule,
    NbComponentsModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ConfirmationWarningComponent
  ]
})
export class ConfirmationsModule { }
