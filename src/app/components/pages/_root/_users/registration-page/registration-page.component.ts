import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';

import {UserAuthenticationActions} from '../../../../../+state';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
})
export class RegistrationPageComponent {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  confirmPassword: string = '';
  isAcceptTermsAndConditions: boolean = false;

  constructor(private readonly store: Store) {
  }

  doGoogleLogin() {
    this.store.dispatch(UserAuthenticationActions.googleLoginAttempt());
  }

  doRegister() {
    this.store.dispatch(UserAuthenticationActions.registerAttempt({
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      confirmPassword: this.confirmPassword,
      isAcceptTermsAndConditions: this.isAcceptTermsAndConditions,
    }));
  }
}
