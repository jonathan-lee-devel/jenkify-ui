import { Routes } from '@angular/router';
import {WelcomePageComponent} from "./components/pages/_root/welcome-page/welcome-page.component";
import {authGuard} from "./guards/auth.guard";
import {HomePageComponent} from "./components/pages/_root/home-page/home-page.component";
import {LoginPageComponent} from "./components/pages/_root/login-page/login-page.component";
import {RegistrationPageComponent} from "./components/pages/_root/registration-page/registration-page.component";

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
  }
];
