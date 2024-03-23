import {Routes} from '@angular/router';

import {HomePageComponent} from './components/pages/_root/home-page/home-page.component';
import {LoginPageComponent} from './components/pages/_root/login-page/login-page.component';
import {RegistrationPageComponent} from './components/pages/_root/registration-page/registration-page.component';
import {WelcomePageComponent} from './components/pages/_root/welcome-page/welcome-page.component';
import {
  GoogleLoginProcessingComponent,
} from './components/pages/_users/google-login-processing/google-login-processing.component';
import {
  GoogleLoginSuccessComponent,
} from './components/pages/_users/google-login-success/google-login-success.component';
import {authGuard} from './guards/auth/auth.guard';
import {welcomeGuard} from './guards/welcome/welcome.guard';

export enum RoutePath {
  /* ANONYMOUS ROUTES */
  LANDING_PAGE = '',
  HOME_PAGE = 'home',
  QUEUED = 'queued',
  CONFIRM_QUEUE = 'confirm-queue',
  LOGIN = 'login',
  REGISTER = 'register',
  REGISTER_CONFIRM = 'register/confirm/:tokenValue',
  RESET_PASSWORD = 'reset-password',
  RESET_PASSWORD_CONFIRM = 'reset-password/confirm/:tokenValue',
  /* ERROR ROUTES */
  SERVER_ERROR = 'error/server-error',
  ERROR_NOT_FOUND = 'error/not-found',
  /* LOADING ROUTES */
  LOGOUT_IN_PROCESS = 'logout-in-process',
  GOOGLE_LOGIN_IN_PROGRESS = 'google-login-in-process',
  GOOGLE_LOGIN_SUCCESS = 'google-login-success',
}

export const rebaseRoutePath = (routePath: RoutePath) => `/${routePath}`;
export const rebaseRoutePathAsString = (routePathAsString: string) => `/${routePathAsString}`;

export const routes: Routes = [
  {
    path: RoutePath.LANDING_PAGE,
    component: WelcomePageComponent,
    canActivate: [welcomeGuard],
  },
  {
    path: RoutePath.HOME_PAGE,
    component: HomePageComponent,
    canActivate: [authGuard],
  },
  {
    path: RoutePath.LOGIN,
    component: LoginPageComponent,
  },
  {
    path: RoutePath.REGISTER,
    component: RegistrationPageComponent,
  },
  {
    path: RoutePath.GOOGLE_LOGIN_IN_PROGRESS,
    component: GoogleLoginProcessingComponent,
  },
  {
    path: RoutePath.GOOGLE_LOGIN_SUCCESS,
    component: GoogleLoginSuccessComponent,
  },
];
