import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {catchError, Observable} from 'rxjs';

import {UserAuthenticationActions} from '../../+state';
import {rebaseRoutePath, RoutePath} from '../../app.routes';
import {HttpStatus} from '../../common/enums/HttpStatus';
import {ToastService} from "../../services/toast/toast.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private store: Store,
    private router: Router,
    private ngZone: NgZone,
    private readonly toastService: ToastService,
    private snackBar: MatSnackBar,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
        .pipe(catchError((err) => this.handleError(err)));
  }

  private handleError(error: HttpErrorResponse): Observable<HttpEvent<unknown>> {
    if (error.status === 0) {
      throw error;
    }

    if (error.status === HttpStatus.BAD_REQUEST) {
      if (error?.error?.status) {
        let isError = false;
        let message: string;
        switch (error.error.status) {
          case 'INVALID_TOKEN':
            isError = true;
            message = 'An invalid token has been provided';
            break;
          case 'EMAIL_VERIFICATION_EXPIRED':
            isError = true;
            message = 'E-mail verification has expired, you will need to resubmit your request';
            break;
          case 'EMAIL_ALREADY_VERIFIED':
            message = 'E-mail verification has already been completed successfully, you may now login';
            break;
          default:
            isError = true;
            message = 'An unknown error has occurred';
        }
        if (!isError) {
          this.toastService.show('Status', message);
        } else {
          this.toastService.show('Error', message);
        }
      } else {
        let message: string;
        if (error?.error?.message) {
          message = error.error.message;
        } else if (error?.error?.errors && error?.error?.errors[0]?.msg) {
          message = JSON.stringify(error?.error?.errors[0]?.msg);
        } else if (error?.error?.error) {
          message = JSON.stringify(error?.error?.error);
        } else if (error?.error?.issues && error?.error?.issues?.length >= 1) {
          message = `${error.error.issues[0].path[0]}: ${JSON.stringify(error.error.issues[0].message)}`;
        } else {
          message = 'An unknown request error has occurred';
        }
        this.toastService.show('Request Error', message);
      }
    }

    if (error.status === HttpStatus.UNAUTHORIZED) {
      this.store.dispatch(UserAuthenticationActions.loginError());
      this.snackBar.open( 'Invalid Login Credentials');
      this.ngZoneRedirect(rebaseRoutePath(RoutePath.LOGIN));
    }

    if (error.status === HttpStatus.FORBIDDEN) {
      this.snackBar.open('Access to that resource or action is denied');
    }

    if (error.status === HttpStatus.NOT_FOUND) {
      this.ngZoneRedirect(rebaseRoutePath(RoutePath.ERROR_NOT_FOUND));
    }

    if (error.status === HttpStatus.CONFLICT) {
      this.snackBar.open('That entity already exists, cannot perform request');
    }

    if (error.status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.ngZoneRedirect(rebaseRoutePath(RoutePath.SERVER_ERROR));
    }

    throw error;
  }

  private ngZoneRedirect(path: string) {
    this.ngZone.run(() => {
      this.router.navigate([path]).catch((reason) => window.alert(reason));
    });
  }
}
