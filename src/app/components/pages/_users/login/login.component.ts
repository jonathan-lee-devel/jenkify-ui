import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';
import {take, tap} from 'rxjs';

import {UserAuthenticationActions} from '../../../../+state/auth/user-auth.actions';
import {UserAuthenticationSelector} from '../../../../+state/auth/user-auth.selector';
import {rebaseRoutePath, RoutePath} from '../../../../app.routes';
import {CookiesNoticeService} from '../../../../services/cookies-notice/cookies-notice.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    NgOptimizedImage,
    RouterLink,
    FormsModule,
    RouterLink,
    NgOptimizedImage,
    NgOptimizedImage,
    MatProgressSpinnerModule,
    InputGroupAddonModule,
    InputGroupModule,
    ReactiveFormsModule,
    CardModule,
    CheckboxModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  password: string = '';
  email: string = '';
  protected readonly loggedInState$;
  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
  private readonly nextParam = 'next';

  constructor(
    private store: Store,
    private cookiesNoticeService: CookiesNoticeService,
    private route: ActivatedRoute,
  ) {
    this.loggedInState$ = this.store.select(UserAuthenticationSelector.selectLoggedInState());
  }

  ngOnInit() {
    this.cookiesNoticeService.triggerIfNotAccepted();
    this.route.queryParams.pipe(
        take(1),
        tap((queryParams) => {
          if (queryParams[this.nextParam]) {
            this.store.dispatch(UserAuthenticationActions.loginPageVisitedWithNext({
              next: queryParams[this.nextParam],
            }));
          }
        }),
    ).subscribe();
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
