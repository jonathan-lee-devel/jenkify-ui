import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, filter, map, of, switchMap, tap} from 'rxjs';

import {UserAuthenticationActions} from './user-auth.actions';
import {UserAuthenticationSelector} from './user-auth.selector';
import {rebaseRoutePath, rebaseRoutePathAsString, RoutePath} from '../../app.routes';
import {AuthService} from '../../services/auth/auth.service';
import {ToastService} from "../../services/toast/toast.service";


@Injectable()
export class UserAuthenticationEffects {
  jwtLoginAttempt$ = this.makeJwtLoginAttemptEffect();

  onLogout$ = this.makeOnLogoutEffect();

  onLoginError$ = this.makeOnLoginErrorEffect();

  onSuccessfulGoogleLogin$ = this.makeOnSuccessfulGoogleLoginEffect();

  onLoginComplete$ = this.makeOnLoginCompleteEffect();

  onLoginPageVisitedWithNext$ = this.makeOnLoginPageVisitedWithNextEffect();

  onUserProfileObtained$ = this.makeUserProfileObtainedEffect();

  googleLoginAttempt$ = this.makeGoogleLoginAttemptEffect();

  checkLoginOnRefresh$ = this.makeCheckLoginOnRefreshEffect();

  onSuccessfulLoginRedirect$ = this.makeOnSuccessfulLoginRedirectEffect();

  onSuccessfulLogin$ = this.makeOnSuccessfulLoginEffect();

  private readonly propertyInvitationSplitUrlLength = 8;
  private readonly propertyInvitationSixthElementValue = 'invitations';

  constructor(
    private store: Store,
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private readonly toastService: ToastService,
  ) {
  }

  private makeUserProfileObtainedEffect() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(UserAuthenticationActions.userProfileObtained),
        map(({userInfo}) => {
          const next = this.authService.getNextParamFromSessionStorageAndReset();
          if (next) {
            this.router.navigate([rebaseRoutePathAsString(decodeURIComponent(next))])
              .catch((reason) => window.alert(reason));
          }
          return UserAuthenticationActions.loginComplete({
            tokens: this.authService.getTokensFromSessionStorage(),
            userInfo,
          });
        }),
      );
    });
  }

  private makeJwtLoginAttemptEffect() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(UserAuthenticationActions.jwtLoginAttempt),
        switchMap(({email, password}) => this.authService.login(email, password)),
        map(({accessToken, refreshToken}) => {
          return UserAuthenticationActions.successfulLoginPreProfileFetch({
            tokens: {
              accessToken,
              refreshToken,
            },
          });
        }),
      );
    });
  }

  private makeGoogleLoginAttemptEffect() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(UserAuthenticationActions.googleLoginAttempt),
        map(() => {
          this.authService.initiateGoogleLogin();
          return UserAuthenticationActions.googleLoginInProgress();
        }),
      );
    });
  }

  private makeCheckLoginOnRefreshEffect() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(UserAuthenticationActions.checkLoginOnRefresh),
        tap(({next}) => {
          this.authService.setNextParamInSessionStorage(next);
        }),
        switchMap(() => this.store.select(UserAuthenticationSelector.selectLoggedInState())),
        filter((loggedInState) => loggedInState === 'INIT' || loggedInState === 'NOT_LOGGED_IN'),
        map(() => {
          const {accessToken, refreshToken} = this.authService.getTokensFromSessionStorage();
          const userInfo = this.authService.getUserInfoFromSessionStorage();
          if (accessToken !== '' && refreshToken !== '' && userInfo) {
            return UserAuthenticationActions.loginComplete({tokens: {accessToken, refreshToken}, userInfo});
          }

          if (this.authService.getAndRemoveGoogleLoginRedirectFromSessionStorage()) {
            return UserAuthenticationActions.googleLoginRedirect();
          }

          return UserAuthenticationActions.logout();
        }),
      );
    });
  }

  private makeOnLogoutEffect() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(UserAuthenticationActions.logout),
        map(() => {
          this.authService.clearUserDataAndTokens();
          this.authService.redirectIfNotAnonymous();
          return UserAuthenticationActions.loggedOut();
        }),
      );
    });
  }

  private makeOnSuccessfulLoginRedirectEffect() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(UserAuthenticationActions.successfulLoginRedirect),
        map(() => {
          this.router.navigate([rebaseRoutePath(RoutePath.LANDING_PAGE)])
            .catch((reason) => window.alert(reason));
          const {accessToken, refreshToken} = this.authService.getTokensFromSessionStorage();
          const userInfo = this.authService.getUserInfoFromSessionStorage();
          return (accessToken !== '' && refreshToken !== '' && userInfo) ?
            UserAuthenticationActions.loginComplete({tokens: {accessToken, refreshToken}, userInfo}) :
            UserAuthenticationActions.loginError();
        }),
      );
    });
  }

  private makeOnLoginErrorEffect() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(UserAuthenticationActions.loginError),
        map(() => {
          this.authService.clearUserDataAndTokens();
          this.router.navigate([rebaseRoutePath(RoutePath.LOGIN)])
            .catch((reason) => window.alert(reason));
          return UserAuthenticationActions.loggedOut();
        }),
      );
    });
  }

  private makeOnSuccessfulLoginEffect() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(UserAuthenticationActions.successfulLoginPreProfileFetch),
        tap(({tokens}) => {
          this.authService.setTokensInSessionStorage(tokens);
        }),
        switchMap(() => this.authService.getProfile()),
        map((userInfo) => {
          this.authService.setUserInfoInSessionStorage(userInfo);
          return UserAuthenticationActions.userProfileObtained({userInfo});
        }),
        catchError(() => { // Rollback login on error
          this.authService.clearTokensFromSessionStorage();
          return of(UserAuthenticationActions.loginError());
        }),
      );
    });
  }

  private makeOnSuccessfulGoogleLoginEffect() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(UserAuthenticationActions.successfulGoogleLoginPreProfileFetch),
        switchMap(({tokenCode}) => this.authService.getTokenFromTokenHold(tokenCode)),
        map(({accessToken, refreshToken}) => {
          return UserAuthenticationActions.successfulLoginPreProfileFetch({
            tokens: {accessToken, refreshToken},
          });
        }),
        catchError(() => of(UserAuthenticationActions.loginError())),
      );
    });
  }

  private makeOnLoginCompleteEffect() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(UserAuthenticationActions.loginComplete),
        map(() => {
          const next = this.authService.getNextParamFromSessionStorageAndReset();
          if (next) {
            this.router.navigate([rebaseRoutePathAsString(decodeURIComponent(next))])
              .catch((reason) => window.alert(reason));
            return UserAuthenticationActions.nextParameterUsed();
          }
          this.router.navigate([rebaseRoutePath(RoutePath.LANDING_PAGE)])
            .catch((reason) => window.alert(reason));
          return UserAuthenticationActions.nextParameterNotUsed();
        }),
      );
    });
  }

  private makeOnLoginPageVisitedWithNextEffect() {
    return createEffect(() => {
      return this.actions$.pipe(
        ofType(UserAuthenticationActions.loginPageVisitedWithNext),
        map(({next}) => {
          this.authService.setNextParamInSessionStorage(next);
          this.toastService.show(
            'Requires User Login',
            'You must be logged in to view that resource, log in now and you will be redirected automatically',
          );
          return UserAuthenticationActions.logout();
        }),
      );
    });
  }
}
