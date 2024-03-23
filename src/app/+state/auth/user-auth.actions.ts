import {createAction, props} from '@ngrx/store';

import {TokensDto} from '../../dtos/auth/TokensDto';
import {UserDto} from '../../dtos/auth/UserDto';

const checkLoginOnRefresh = createAction(
    '[Auth] Check Login on Refresh',
    props<{next: string}>(),
);

const loginPageVisitedWithNext = createAction(
    '[Auth] Login Page Visited with Next',
    props<{next: string}>(),
);

const nextParameterUsed = createAction(
    '[Auth] Next Parameter Used',
);

const nextParameterNotUsed = createAction(
    '[Auth] Next Parameter Not Used',
);

const jwtLoginAttempt = createAction(
    '[Auth] JWT Login Attempt',
    props<{email: string, password: string}>(),
);

const registerAttempt = createAction(
    '[Auth] Register Attempt',
    props<{
      email: string,
      firstName: string,
      lastName: string,
      password: string,
      confirmPassword: string,
      isAcceptTermsAndConditions: boolean,
    }>(),
);

const registerAttempted = createAction(
    '[Auth] Register Attempted',
);

const googleLoginAttempt = createAction(
    '[Auth] Google Login Attempt',
);

const googleLoginInProgress = createAction(
    '[Auth] Google Login in Progress',
);

const googleLoginRedirect = createAction(
    '[Auth] Google Login Redirect',
);

const successfulGoogleLoginPreProfileFetch = createAction(
    '[Auth] Successful Google Login Pre Profile Fetch',
    props<{tokenCode: string}>(),
);

const successfulLoginPreProfileFetch = createAction(
    '[Auth] Successful Login Pre Profile Fetch',
    props<{tokens: TokensDto}>());

const loginError = createAction(
    '[Auth] Login Error',
);

const userProfileObtained = createAction(
    '[Auth] User Profile Obtained',
    props<{userInfo: UserDto}>());

const successfulLoginRedirect = createAction(
    '[Auth] Successful Login Redirect',
);

const loginComplete = createAction(
    '[Auth] Login Complete',
    props<{tokens: TokensDto, userInfo: UserDto}>(),
);

const logout = createAction(
    '[Auth] Logout',
);

const loggedOut = createAction(
    '[Auth] Logged Out',
);

export const UserAuthenticationActions = {
  checkLoginOnRefresh,
  loginPageVisitedWithNext,
  jwtLoginAttempt,
  registerAttempt,
  registerAttempted,
  googleLoginAttempt,
  googleLoginInProgress,
  googleLoginRedirect,
  successfulLoginPreProfileFetch,
  successfulGoogleLoginPreProfileFetch,
  loginError,
  userProfileObtained,
  successfulLoginRedirect,
  loginComplete,
  logout,
  loggedOut,
  nextParameterUsed,
  nextParameterNotUsed,
} as const;
