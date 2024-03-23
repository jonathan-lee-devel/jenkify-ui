import {NgIf} from '@angular/common';
import {Component, Input} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {RouterLink, RouterOutlet} from '@angular/router';

import {rebaseRoutePath, RoutePath} from '../../../app.routes';
import {ToastComponent} from '../toast/toast.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatButton,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    RouterOutlet,
    RouterLink,
    NgIf,
    MatDivider,
    ToastComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input({required: true}) opened: boolean = true;
  @Input({required: true}) isLoggedIn: boolean = false;

  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
  jenkinsInstances: string[] = [
    'eks-dev',
    'eks-uat',
  ];
}
