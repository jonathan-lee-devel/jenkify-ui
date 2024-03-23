import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {of} from 'rxjs';

import {LoginComponent} from './login.component';
import {UserAuthenticationActions, UserAuthenticationState} from '../../../../+state';
import {CookiesNoticeService} from '../../../../services/cookies-notice/cookies-notice.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockStore: MockStore;

  const mockCookiesNoticeService = {
    triggerIfNotAccepted: () => {},
    doAccept: () => {},
  };

  const makeMockActivatedRoute = (nextValue?: string) => ({
    queryParams: of([(nextValue) ? {next: nextValue}: {next: undefined}]),
  });


  const userAuthenticationState: UserAuthenticationState = {
    loggedInState: 'NOT_LOGGED_IN',
    tokens: {accessToken: '', refreshToken: ''},
    userInfo: {email: '', firstName: '', lastName: ''},
  };

  const nextValue = 'nextValue';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        provideMockStore({initialState: userAuthenticationState}),
        {provide: ActivatedRoute, useValue: makeMockActivatedRoute(nextValue)},
        {provide: CookiesNoticeService, useValue: mockCookiesNoticeService},
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger cookies notice on load and not accept', () => {
    const cookiesNoticeTriggerSpy = spyOn(mockCookiesNoticeService, 'triggerIfNotAccepted');
    const cookiesNoticeAcceptSpy = spyOn(mockCookiesNoticeService, 'doAccept');
    const doGoogleLoginSpy = spyOn(component, 'doGoogleLogin');
    const doLoginSpy = spyOn(component, 'doLogin');

    fixture.detectChanges();

    expect(cookiesNoticeTriggerSpy).toHaveBeenCalledOnceWith();
    expect(cookiesNoticeAcceptSpy).not.toHaveBeenCalledOnceWith();
    expect(doGoogleLoginSpy).not.toHaveBeenCalledOnceWith();
    expect(doLoginSpy).not.toHaveBeenCalledOnceWith();
  });

  it('clicking login with google should call login with google method', () => {
    const cookiesNoticeTriggerSpy = spyOn(mockCookiesNoticeService, 'triggerIfNotAccepted');
    const cookiesNoticeAcceptSpy = spyOn(mockCookiesNoticeService, 'doAccept');
    const doGoogleLoginSpy = spyOn(component, 'doGoogleLogin');
    const doLoginSpy = spyOn(component, 'doLogin');

    const button = (fixture.debugElement.nativeElement as HTMLElement)
        .querySelector('[data-testid="google-login-button"]') as HTMLButtonElement | null;
    button?.click();

    fixture.detectChanges();

    expect(cookiesNoticeTriggerSpy).toHaveBeenCalledOnceWith();
    expect(cookiesNoticeAcceptSpy).not.toHaveBeenCalledOnceWith();
    expect(doGoogleLoginSpy).toHaveBeenCalledOnceWith();
    expect(doLoginSpy).not.toHaveBeenCalledOnceWith();
  });

  it('clicking login with google should dispatch google login attempt action', fakeAsync(() => {
    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();

    const button = (fixture.debugElement.nativeElement as HTMLElement)
        .querySelector('[data-testid="google-login-button"]') as HTMLButtonElement | null;
    button?.click();

    tick();
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledOnceWith(UserAuthenticationActions.googleLoginAttempt());
  }));

  it('submitting login form should call do login method', () => {
    const cookiesNoticeTriggerSpy = spyOn(mockCookiesNoticeService, 'triggerIfNotAccepted');
    const cookiesNoticeAcceptSpy = spyOn(mockCookiesNoticeService, 'doAccept');
    const doGoogleLoginSpy = spyOn(component, 'doGoogleLogin');
    const doLoginSpy = spyOn(component, 'doLogin');

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit');

    fixture.detectChanges();

    expect(cookiesNoticeTriggerSpy).toHaveBeenCalledOnceWith();
    expect(cookiesNoticeAcceptSpy).not.toHaveBeenCalledOnceWith();
    expect(doGoogleLoginSpy).not.toHaveBeenCalledOnceWith();
    expect(doLoginSpy).toHaveBeenCalledOnceWith();
  });

  it('submitting login form should dispatch jwt login attempt action', fakeAsync(() => {
    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit');

    tick();
    fixture.detectChanges();

    expect(dispatchSpy)
        .toHaveBeenCalledOnceWith(UserAuthenticationActions
            .jwtLoginAttempt({email: component.email, password: component.password}));
  }));

  /*
  TODO: Get query params observable returning in mock

  it('next parameter action should be dispatched', fakeAsync(() => {
    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();

    tick();
    fixture.detectChanges();

    expect(dispatchSpy)
        .toHaveBeenCalledOnceWith(UserAuthenticationActions
            .loginPageVisitedWithNext({next: nextValue}));
  }));
  */
});
