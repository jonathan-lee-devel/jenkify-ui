import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, tap} from 'rxjs';

import {UserAuthenticationSelector} from '../../+state/auth/user-auth.selector';
import {TokensDto} from '../../dtos/auth/TokensDto';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private tokens$: Observable<TokensDto>;
  private accessToken: string | undefined;

  constructor(
    private store: Store,
  ) {
    this.tokens$ = this.store.select(UserAuthenticationSelector.selectTokens());
    this.tokens$.pipe(
        tap((tokens) => this.accessToken = tokens.accessToken),
    ).subscribe();
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({withCredentials: true, setHeaders: {Authorization: `Bearer ${String(this.accessToken)}`}});
    return next.handle(request);
  }
}
