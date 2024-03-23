import {Component, Input} from '@angular/core';
import {rebaseRoutePath, RoutePath} from "../../../app.routes";
import {MatButton} from "@angular/material/button";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatButton,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input({required: true}) opened: boolean = true;

  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
}
