import { Component } from '@angular/core';
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {NgOptimizedImage} from "@angular/common";
import {rebaseRoutePath, RoutePath} from "../../../../app.routes";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [
    NgbAlert,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent {

  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
}
