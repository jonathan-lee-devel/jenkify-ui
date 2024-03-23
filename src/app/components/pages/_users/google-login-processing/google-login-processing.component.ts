import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {environment} from '../../../../../environments/environment';
import {SuccessCheckmarkComponent} from '../../../lib/success-checkmark/success-checkmark.component';

@Component({
  selector: 'app-google-login-processing',
  standalone: true,
  imports: [CommonModule, SuccessCheckmarkComponent, MatProgressSpinnerModule],
  templateUrl: './google-login-processing.component.html',
  styleUrl: './google-login-processing.component.scss',
})
export class GoogleLoginProcessingComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      window.location.href = `${environment.AUTH_SERVICE_BASE_URL}/google`;
    }, 2500);
  }
}
