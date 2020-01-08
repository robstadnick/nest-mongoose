//@ANGULAR
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService, NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-warning-quote',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss'],
})
export class ConfirmationWarningComponent implements OnInit {

  loading: boolean = true
  title: string
  discription: string
  confirmation: boolean

  confirm: string
  cancel: string
  noText: string
  issueLast: boolean

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private toastr: NbToastrService,
    protected dialogRef: NbDialogRef<ConfirmationWarningComponent>,
  ) { }

  ngOnInit() {

  }

  selectedConfirmation(confirmation) {
    this.confirmation = confirmation
    this.dialogRef.close(confirmation);
  }

  handleError(error) {
    if (error) {
      this.toastr.info(error.error, 'Sorry We Ran Into An Error, Our Team Has Been Notified. Please Try Again Later')
      this.loading = false
      return
    }
  }


}
