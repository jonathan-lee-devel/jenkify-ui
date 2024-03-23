import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';

import {UserAuthenticationActions} from '../../../../+state';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(private readonly store: Store) {
  }

  doLogin() {
    this.store.dispatch(UserAuthenticationActions.jwtLoginAttempt({
      email: this.email,
      password: this.password,
    }));
  }

  doGoogleLogin() {
    this.store.dispatch(UserAuthenticationActions.googleLoginAttempt());
  }
}
