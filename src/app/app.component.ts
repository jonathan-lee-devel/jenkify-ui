import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription, tap} from 'rxjs';

import {UserAuthenticationActions, UserAuthenticationSelector} from './+state';
import {rebaseRoutePath, rebaseRoutePathAsString, RoutePath} from './app.routes';
import {NavbarComponent} from './components/lib/navbar/navbar.component';
import {SidebarComponent} from './components/lib/sidebar/sidebar.component';
import {SidebarService} from './services/sidebar/sidebar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    MatButton,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    RouterLink,
    SidebarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'jenkify-ui';
  isSidebarOpenedSubscription: Subscription;
  isLoggedInSubscription: Subscription;
  opened: boolean = true;
  isLoggedIn: boolean = false;

  constructor(
    private readonly store: Store,
    private readonly sidebarService: SidebarService,
  ) {
    this.isSidebarOpenedSubscription = this.sidebarService.isSideBarOpened$
        .pipe(
            tap((isSideBarOpened) => {
              this.opened = isSideBarOpened;
            }),
        ).subscribe();

    this.isLoggedInSubscription = this.store.select(UserAuthenticationSelector.selectLoggedInState())
        .pipe(
            tap((loggedInState) => {
              this.isLoggedIn = loggedInState === 'LOGGED_IN';
            }),
        ).subscribe();
  }

  ngOnInit() {
    this.store.dispatch(UserAuthenticationActions.checkLoginOnRefresh({
      next: encodeURIComponent(rebaseRoutePathAsString(RoutePath.HOME_PAGE)),
    }));
  }

  ngOnDestroy() {
    this.isSidebarOpenedSubscription?.unsubscribe();
    this.isLoggedInSubscription?.unsubscribe();
  }

  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
}
