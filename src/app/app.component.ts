import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./components/lib/navbar/navbar.component";
import {Store} from "@ngrx/store";
import {UserAuthenticationActions} from "./+state";
import {rebaseRoutePathAsString, RoutePath} from "./app.routes";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'jenkify-ui';

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.store.dispatch(UserAuthenticationActions.checkLoginOnRefresh({next: encodeURIComponent(rebaseRoutePathAsString(RoutePath.HOME_PAGE))}));
  }

}
