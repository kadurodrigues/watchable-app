import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../auth.service';

@Component({
  selector: 'wb-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup;
  public email: FormControl;
  public password: FormControl;

  public shouldShowSpinner = false;
  public shouldShowAuthError = false;
  public authErrorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<SignInComponent>
  ) { }

  ngOnInit() {
    this.email = this.formBuilder.control(null, [Validators.required, Validators.email]);
    this.password = this.formBuilder.control(null, Validators.required);

    this.signInForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    })
  }

  public signIn() {
    this.shouldShowSpinner = true;
    this.shouldShowAuthError = false;

    const { email, password } = this.signInForm.value;

    this.authService.getSignIn(email, password)
      .then(user => this.onSignInSuccessfull(user))
      .catch(error => this.onSignInFailed(error) );
  }

  public onSignInSuccessfull(user: any) {
    this.shouldShowSpinner = false;
    this.dialogRef.close(user);
  }

  public onSignInFailed(error) {
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
