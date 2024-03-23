import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {environment} from '../../../environments/environment';
import {rebaseRoutePath, rebaseRoutePathAsString, RoutePath} from '../../app.routes';
import {LoginDto} from '../../dtos/auth/LoginDto';
import {TokensDto} from '../../dtos/auth/TokensDto';
import {UserDto} from '../../dtos/auth/UserDto';
import {TokenHoldDto} from '../../dtos/users/TokenHoldDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_DATA_KEY = 'user-data';
  private readonly ACCESS_TOKEN_KEY = 'access-token';
  private readonly REFRESH_TOKEN_KEY = 'refresh-token';
  private readonly GOOGLE_LOGIN_REDIRECT = 'google-login-redirect';
  private readonly NEXT_PARAMETER = 'next';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
  }

  public login(email: string, password: string) {
    return this.httpClient.post<LoginDto>(`${environment.AUTH_SERVICE_BASE_URL}/login`, {
      email,
      password,
    });
  }

  public getProfile() {
    return this.httpClient.get<UserDto>(`${environment.USERS_SERVICE_BASE_URL}/profile`);
  }

  public getTokenFromTokenHold(tokenCode: string) {
    return this.httpClient.post<TokenHoldDto>(`${environment.AUTH_SERVICE_BASE_URL}/token-code`, {tokenCode});
  }

  public redirectIfNotAnonymous() {
    if (
      this.router.url !== rebaseRoutePath(RoutePath.LANDING_PAGE) &&
      this.router.url !== rebaseRoutePath(RoutePath.QUEUED) &&
      this.router.url !== rebaseRoutePath(RoutePath.REGISTER) &&
      this.router.url !== rebaseRoutePath(RoutePath.RESET_PASSWORD) &&
      !this.router.url.startsWith(rebaseRoutePathAsString(RoutePath.RESET_PASSWORD_CONFIRM
          .replace(':tokenValue', ''))) &&
      !this.router.url.startsWith(rebaseRoutePathAsString(RoutePath.REGISTER_CONFIRM
          .replace(':tokenValue', ''))) &&
      !/^.*\/properties\/[a-zA-Z0-9]+\/invitations\/accept\/[a-zA-Z0-9]+.*$/.exec(this.router.url)
    ) { // Don't redirect to login page on anonymous pages (first-time visit etc.)
      this.router.navigate([rebaseRoutePath(RoutePath.LOGIN)])
          .catch((reason) => window.alert(reason));
    }
  }

  public clearUserDataAndTokens() {
    sessionStorage.removeItem(this.USER_DATA_KEY);
    sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  public getTokensFromSessionStorage(): TokensDto {
    const accessToken = sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
    const refreshToken = sessionStorage.getItem(this.REFRESH_TOKEN_KEY);
    return (accessToken && refreshToken) ?
      {accessToken, refreshToken} :
      {accessToken: '', refreshToken: ''};
  }

  // TODO: use profile DTO
  public getUserInfoFromSessionStorage() {
    const userInfo = sessionStorage.getItem(this.USER_DATA_KEY);
    return (userInfo) ?
      JSON.parse(userInfo) as UserDto :
      null;
  }

  public getAndRemoveGoogleLoginRedirectFromSessionStorage() {
    const googleLoginRedirect = sessionStorage.getItem(this.GOOGLE_LOGIN_REDIRECT);
    if (!googleLoginRedirect) {
      return false;
    }
    sessionStorage.removeItem(this.GOOGLE_LOGIN_REDIRECT);
    return googleLoginRedirect;
  }

  public setTokensInSessionStorage(tokens: TokensDto) {
    sessionStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken);
    sessionStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
  }

  public clearTokensFromSessionStorage() {
    sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  public setUserInfoInSessionStorage(userInfo: UserDto) {
    sessionStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userInfo));
  }

  public initiateGoogleLogin() {
    this.router.navigate([rebaseRoutePath(RoutePath.GOOGLE_LOGIN_IN_PROGRESS)])
        .catch((reason) => window.alert(reason));
    sessionStorage.setItem(this.GOOGLE_LOGIN_REDIRECT, JSON.stringify({updatedAt: new Date().toISOString()}));
  }

  public getNextParamFromSessionStorageAndReset() {
    const next = sessionStorage.getItem(this.NEXT_PARAMETER);
    sessionStorage.removeItem(this.NEXT_PARAMETER);
    return next;
  }

  public setNextParamInSessionStorage(next: string) {
    if (next !== encodeURIComponent(rebaseRoutePath(RoutePath.LOGIN)) && !next.startsWith('google-login-success')) {
      sessionStorage.setItem(this.NEXT_PARAMETER, next);
    }
  }

  public clearNextParameterFromSessionStorage() {
    sessionStorage.removeItem(this.NEXT_PARAMETER);
  }

  isNextParamInSessionStorage() {
    const next = sessionStorage.getItem(this.NEXT_PARAMETER);
    return (next === null);
  }
}
