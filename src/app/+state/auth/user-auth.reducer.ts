import {createReducer, on} from '@ngrx/store';

import {UserAuthenticationActions} from './user-auth.actions';
import {TokensDto} from '../../dtos/auth/TokensDto';
import {UserDto} from '../../dtos/auth/UserDto';

export type LoggedInState = 'INIT' | 'NOT_LOGGED_IN' | 'LOADING' | 'LOGGED_IN';

export interface UserAuthenticationState {
  loggedInState: LoggedInState,
  tokens: TokensDto,
  userInfo: UserDto,
}

const initialState: UserAuthenticationState = {
  loggedInState: 'INIT',
  tokens: {
    accessToken: '',
    refreshToken: '',
  },
  userInfo: {
    email: '',
    firstName: '',
    lastName: '',
  },
};

export const userAuthReducer = createReducer(
    initialState,
    on(UserAuthenticationActions.successfulLoginPreProfileFetch, (state, {tokens}): UserAuthenticationState => {
      return {...state, loggedInState: 'LOADING', tokens};
    }),
    on(UserAuthenticationActions.userProfileObtained, (state, {userInfo}): UserAuthenticationState => {
      return {...state, loggedInState: 'LOGGED_IN', userInfo};
    }),
    on(UserAuthenticationActions.googleLoginAttempt, (state): UserAuthenticationState => {
      return {...state, loggedInState: 'LOADING'};
    }),
    on(UserAuthenticationActions.googleLoginRedirect, (state): UserAuthenticationState => {
      return {...state, loggedInState: 'LOADING'};
    }),
    on(UserAuthenticationActions.logout, (state): UserAuthenticationState => {
      return {...state, loggedInState: 'NOT_LOGGED_IN'};
    }),
    on(UserAuthenticationActions.loggedOut, (state): UserAuthenticationState => {
      return {...state, loggedInState: 'NOT_LOGGED_IN'};
    }),
    on(UserAuthenticationActions.loginComplete, (state, {tokens, userInfo}): UserAuthenticationState => {
      return {loggedInState: 'LOGGED_IN', tokens, userInfo};
    }),
);
