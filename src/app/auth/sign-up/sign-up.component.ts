import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'wb-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;
  public name: FormControl;
  public email: FormControl;
  public password: FormControl;

  public shouldShowSpinner = false;
  public shouldShowAuthError = false;
  public authErrorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.name = this.formBuilder.control(null, Validators.required);
    this.email = this.formBuilder.control(null, [Validators.required, Validators.email]);
    this.password = this.formBuilder.control(null, Validators.required);

    this.signUpForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      password: this.password
    })
  }

  public getNameErrorMessage() {
    return 'You must enter a name';
  }

  public getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' 
      : this.email.hasError('email') ? 'Not a valid email' 
      : '';
  }

}
