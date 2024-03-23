import { Component } from '@angular/core';
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [
    NgbAlert,
    NgOptimizedImage,
  ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent {

}
