import {inject} from '@angular/core';
import {CanActivateFn, Router, UrlSegment} from '@angular/router';
import {Store} from '@ngrx/store';
import {map} from 'rxjs';

import {UserAuthenticationSelector} from '../+state';
import {rebaseRoutePath, RoutePath} from '../app.routes';
import {AuthService} from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route) => {
  const store = inject(Store);
  const router = inject(Router);
  const authService = inject(AuthService);
  return store.select(UserAuthenticationSelector.selectLoggedInState()).pipe(
      map((loggedInState) => {
        if (loggedInState === 'LOGGED_IN' || loggedInState === 'INIT') {
          return true;
        }

        authService.setNextParamInSessionStorage(buildUrlEncodedNextParam(route.url));
        router.navigate([rebaseRoutePath(RoutePath.LOGIN)], {queryParams: {
          next: buildUrlEncodedNextParam(route.url),
        }}).catch((reason) => window.alert(reason));
        return false;
      }),
  );
};

const buildUrlEncodedNextParam = (urlSegments: UrlSegment[]) => {
  let nextParam = '';
  for (const urlSegment of urlSegments) {
    nextParam = `${nextParam}/${urlSegment}`;
  }
  return encodeURIComponent(nextParam);
};
