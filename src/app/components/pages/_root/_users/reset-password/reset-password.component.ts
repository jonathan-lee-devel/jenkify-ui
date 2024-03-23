import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';

import {rebaseRoutePath, RoutePath} from '../../../../app.routes';
import {PasswordService} from '../../../../services/password/password.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  email: string = '';
  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;

  constructor(
    private passwordService: PasswordService,
  ) {}

  doSendPasswordResetRequest() {
    this.passwordService.sendPasswordResetRequest(this.email);
  }
}
