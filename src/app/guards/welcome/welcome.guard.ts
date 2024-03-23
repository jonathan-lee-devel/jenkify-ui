import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {map} from 'rxjs';

import {UserAuthenticationSelector} from '../../+state';
import {rebaseRoutePath, RoutePath} from '../../app.routes';
import {AuthService} from '../../services/auth/auth.service';

export const welcomeGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(UserAuthenticationSelector.selectLoggedInState()).pipe(
      map((loggedInState) => {
        if (loggedInState === 'LOGGED_IN' && router.url.startsWith(rebaseRoutePath(RoutePath.LANDING_PAGE))) {
          router.navigate([rebaseRoutePath(RoutePath.HOME_PAGE)])
              .catch((reason) => window.alert(reason));
          return false;
        }
        return true;
      }),
  );
};
