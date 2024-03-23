import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {environment} from '../../../environments/environment';
import {RoutePath} from '../../app.routes';
import {RegisterDto} from '../../dtos/register/RegisterDto';
import {RegistrationRequestDto} from '../../dtos/register/RegistrationRequestDto';
import {ToastWrapperService} from '../toast-wrapper/toast-wrapper.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastWrapperService: ToastWrapperService,
  ) { }

  doRegister(registrationRequestDto: RegistrationRequestDto) {
    this.httpClient.post<RegisterDto>(`${environment.AUTH_SERVICE_BASE_URL}/register`, registrationRequestDto)
        .subscribe((registerDto) => {
          this.router.navigate([`/${RoutePath.LOGIN}`])
              .catch((reason) => {
                window.alert(reason);
              });
          let isError: boolean = false;
          let message: string;
          switch (registerDto.status) {
            case 'AWAITING_EMAIL_VERIFICATION':
              message = 'Please check your e-mail inbox for further instructions';
              break;
            default:
              isError = true;
              message = 'An unknown error has occurred';
          }
          if (!isError) {
            this.toastWrapperService.showConfirmMessage(
                'Verification E-mail Sent',
                'We have sent you further instructions, if not found, check your spam folder.',
                true,
                true,
                'info',
            );
          } else {
            this.toastWrapperService.showToast(
                'Error',
                message,
                false,
                true,
                'error',
                10_000,
            );
          }
        });
  }

  doConfirmRegister(tokenValue: string) {
    this.httpClient.post<RegisterDto>(`${environment.AUTH_SERVICE_BASE_URL}/register/confirm`, {tokenValue})
        .subscribe((registerDto) => {
          let isError = false;
          let message: string;
          let shouldRedirect = false;
          switch (registerDto.status) {
            case 'SUCCESS':
              message = 'Your e-mail has been verified successfully, you may now log in';
              shouldRedirect = true;
              break;
            default:
              isError = true;
              message = 'An unknown error has occurred';
          }
          if (shouldRedirect) {
            this.router.navigate([`/${RoutePath.LOGIN}`]).catch((reason) => window.alert(reason));
          }
          if (!isError) {
            this.toastWrapperService.showConfirmMessage(
                'E-mail Verified Successfully',
                'You may now log in',
                true,
                true,
                'info',
            );
          } else {
            this.toastWrapperService.showToast(
                'Error',
                message,
                false,
                true,
                'error',
                10_000,
            );
          }
        });
  }
}
