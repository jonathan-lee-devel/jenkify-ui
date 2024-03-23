import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';

import {rebaseRoutePath, RoutePath} from '../../../../app.routes';
import {RegisterService} from '../../../../services/register/register.service';

@Component({
  selector: 'app-auth-confirm',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    InputGroupAddonModule,
    InputGroupModule,
  ],
  templateUrl: './register-confirm.component.html',
  styleUrl: './register-confirm.component.scss',
})
export class RegisterConfirmComponent implements OnInit {
  tokenValue: string = '';
  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;

  constructor(
    private route: ActivatedRoute,
    private registerService: RegisterService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tokenValue = params['tokenValue'];
    });
  }

  doConfirmRegister() {
    this.registerService.doConfirmRegister(this.tokenValue);
  }
}
