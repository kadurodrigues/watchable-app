import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'wb-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public loginForm: FormGroup;
  public email: FormControl;
  public password: FormControl;

  public shouldShowSpinner = false;
  public shouldShowAuthError = false;
  public authErrorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
  ) { }

  ngOnInit() {
    this.email = this.formBuilder.control(null, [Validators.required, Validators.email]);
    this.password = this.formBuilder.control(null, Validators.required);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    })
  }

  // public createUser() {
  //   this.shouldShowSpinner = true;
  //   const { email, password } = this.loginForm.value;

  //   this.auth.createUser(email, password)
  //     .then(user => this.onCreateUserSuccessfull(user))
  //     .catch(error => this.onCreateUserError(error) );
  // }

  public onCreateUserSuccessfull(user: any) {
    this.shouldShowSpinner = false;
    this.dialogRef.close();
  }

  public onCreateUserError(error) {
    this.shouldShowSpinner = false;
    this.shouldShowAuthError = true;
    this.authErrorMessage = error.message;
  }

  public getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' 
      : this.email.hasError('email') ? 'Not a valid email' 
      : '';
  }

}
