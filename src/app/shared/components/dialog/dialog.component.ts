import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'wb-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);
  public pswHide = true;
  constructor() { }

  ngOnInit() {
  }

  public getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' 
      : this.email.hasError('email') ? 'Not a valid email' 
      : '';
  }

}
