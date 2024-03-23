import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Store} from "@ngrx/store";
import {LoggedInState, UserAuthenticationSelector} from "../../../+state";
import {Observable} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {RouterLink} from "@angular/router";

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
    MatButton
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  loggedInState$: Observable<LoggedInState>;

  constructor(private readonly store: Store) {
    this.loggedInState$ = this.store.select(UserAuthenticationSelector.selectLoggedInState());
  }

}
