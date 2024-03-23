import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-logout-in-process',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './logout-in-process.component.html',
  styleUrl: './logout-in-process.component.scss',
})
export class LogoutInProcessComponent {

}
