import {provideState, provideStore} from "@ngrx/store";
import {
  QUEUE_FEATURE_NAME,
  QueueEffects,
  queueReducer,
  USER_AUTHENTICATION_FEATURE_NAME,
  UserAuthenticationEffects, userAuthReducer
} from "./+state";
import {JOBS_FEATURE_NAME, JobsEffects, jobsReducer} from "./+state/jobs";
import {provideEffects} from "@ngrx/effects";
import {provideRouter} from "@angular/router";
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi} from "@angular/common/http";
import {routes} from "./app.routes";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import {provideAnimations} from "@angular/platform-browser/animations";
import {ErrorInterceptor} from "./interceptors/error/error.interceptor";
import {AuthInterceptor} from "./interceptors/auth/auth.interceptor";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";

export const DEFAULT_APP_PROVIDERS = [
  provideStore(),
  provideState({name: USER_AUTHENTICATION_FEATURE_NAME, reducer: userAuthReducer}),
  provideState({name: JOBS_FEATURE_NAME, reducer: jobsReducer}),
  provideState({name: QUEUE_FEATURE_NAME, reducer: queueReducer}),
  provideEffects([
    UserAuthenticationEffects,
    JobsEffects,
    QueueEffects,
  ]),
  provideRouter(routes),
  provideHttpClient(withFetch(), withInterceptorsFromDi()),
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
  provideAnimationsAsync(),
];
