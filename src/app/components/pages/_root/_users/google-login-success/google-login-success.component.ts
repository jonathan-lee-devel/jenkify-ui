import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {delay, take, tap} from 'rxjs';

import {UserAuthenticationActions} from '../../../../../+state';
import {SuccessCheckmarkComponent} from '../../../../lib/success-checkmark/success-checkmark.component';


@Component({
  selector: 'app-google-login-success',
  standalone: true,
  imports: [CommonModule, SuccessCheckmarkComponent],
  templateUrl: './google-login-success.component.html',
  styleUrl: './google-login-success.component.scss',
})
export class GoogleLoginSuccessComponent implements OnInit {
  private tokenCode = 'tokenCode';

  constructor(
      private store: Store,
      private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams
        .pipe(
            take(1),
            delay(2500),
            tap((queryParams) => {
              this.store.dispatch(UserAuthenticationActions.successfulGoogleLoginPreProfileFetch({
                tokenCode: queryParams[this.tokenCode],
              }));
            }),
        ).subscribe();
  }
}
