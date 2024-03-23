import {AsyncPipe, NgIf} from '@angular/common';
import {Component} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatToolbar} from '@angular/material/toolbar';
import {MatTooltip} from '@angular/material/tooltip';
import {RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {LoggedInState, UserAuthenticationActions, UserAuthenticationSelector} from '../../../+state';
import {rebaseRoutePath, RoutePath} from '../../../app.routes';
import {SidebarService} from '../../../services/sidebar/sidebar.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon,
    NgIf,
    AsyncPipe,
    MatProgressSpinner,
    RouterLink,
    MatButton,
    MatTooltip,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  loggedInState$: Observable<LoggedInState>;

  constructor(
    private readonly store: Store,
    private readonly sidebarService: SidebarService,
  ) {
    this.loggedInState$ = this.store.select(UserAuthenticationSelector.selectLoggedInState());
  }

  toggleSidebar() {
    this.sidebarService.toggleSideBar();
  }

  doLogout() {
    this.store.dispatch(UserAuthenticationActions.logout());
  }

  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
}
