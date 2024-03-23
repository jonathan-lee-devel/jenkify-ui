import { Injectable } from '@angular/core';

export interface ToastInfo {
  header: string;
  body: string;
  delay?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: ToastInfo[] = [];

  show(header: string, body: string) {
    this.toasts.push({header, body});
  }

  remove(toastToRemove: ToastInfo) {
    this.toasts = this.toasts.filter((toast) => toastToRemove != toast);
  }
}
