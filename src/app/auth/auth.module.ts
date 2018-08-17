import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {}
