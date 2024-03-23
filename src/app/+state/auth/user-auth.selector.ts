import {createFeatureSelector, createSelector} from '@ngrx/store';

import {UserAuthenticationState} from './user-auth.reducer';

export const USER_AUTHENTICATION_FEATURE_NAME = 'user-authentication';

const selectUserAuthenticationState = createFeatureSelector<UserAuthenticationState>(USER_AUTHENTICATION_FEATURE_NAME);

const selectLoggedInState= () => createSelector(
    selectUserAuthenticationState,
    (state: UserAuthenticationState) => state.loggedInState,
);

const selectLoggedInUserInfo = () => createSelector(
    selectUserAuthenticationState,
    (state: UserAuthenticationState) => state.userInfo,
);

const selectTokens = () => createSelector(
    selectUserAuthenticationState,
    (state: UserAuthenticationState) => state.tokens,
);

export const UserAuthenticationSelector = {
  selectLoggedInState,
  selectLoggedInUserInfo,
  selectTokens,
} as const;
