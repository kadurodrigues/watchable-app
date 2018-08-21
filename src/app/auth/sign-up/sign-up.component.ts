import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UsersService } from '../../shared/services/users.service';

import { AngularFirestore } from 'angularfire2/firestore'

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
    private authService: AuthService,
    private usersService: UsersService,
    private db: AngularFirestore
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

  public signUp() {
    const { email, password } = this.signUpForm.value;

    this.authService.getSignUp(email, password)
      .then(response => this.onSignUpSuccessfull(response))
      .catch(error => this.onSignUpFailed(error))
  }

  public onSignUpSuccessfull(response) {
    const { name } = this.signUpForm.value;
    const { uid } = response.user;

    this.usersService.createUser(uid, name)
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  public onSignUpFailed(error) {
    console.log(error);
  }

  public onCreateUserSuccessfull(response) {
    console.log(response);
  }

  public onCreateUserFailed(error) {
    console.log(error);
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
