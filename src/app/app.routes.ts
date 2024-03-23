import { Routes } from '@angular/router';
import {WelcomePageComponent} from "./components/pages/_root/welcome-page/welcome-page.component";

export enum RoutePath {
  /* ANONYMOUS ROUTES */
  LANDING_PAGE = '',
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
  }
];
