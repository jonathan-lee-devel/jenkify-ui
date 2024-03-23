import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';

import {UserAuthenticationActions} from '../../../../+state/auth/user-auth.actions';
import {rebaseRoutePath, RoutePath} from '../../../../app.routes';
import {RegisterService} from '../../../../services/register/register.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgOptimizedImage,
    RouterLink,
    FormsModule,
    ButtonModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    CheckboxModule,
    ToastModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  confirmPassword: string = '';
  isAcceptTermsAndConditions: boolean = false;
  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;

  constructor(
    private store: Store,
    private registerService: RegisterService,
  ) {}

  doGoogleLogin() {
    this.store.dispatch(UserAuthenticationActions.googleLoginAttempt());
  }

  doRegister() {
    this.registerService.doRegister({
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      confirmPassword: this.confirmPassword,
      isAcceptTermsAndConditions: this.isAcceptTermsAndConditions,
    });
  }
}
