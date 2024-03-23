import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./components/lib/navbar/navbar.component";
import {Store} from "@ngrx/store";
import {UserAuthenticationActions} from "./+state";
import {rebaseRoutePath, rebaseRoutePathAsString, RoutePath} from "./app.routes";
import {SidebarService} from "./services/sidebar/sidebar.service";
import {Subscription, tap} from "rxjs";
import {MatButton} from "@angular/material/button";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {SidebarComponent} from "./components/lib/sidebar/sidebar.component";

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
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'jenkify-ui';
  isSidebarOpenedSubscription: Subscription;
  opened: boolean = true;

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
  }

  ngOnInit() {
    this.store.dispatch(UserAuthenticationActions.checkLoginOnRefresh({
      next: encodeURIComponent(rebaseRoutePathAsString(RoutePath.HOME_PAGE))
    }));
  }

  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
}
