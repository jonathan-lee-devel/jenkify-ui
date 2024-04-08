import {AsyncPipe, NgIf} from '@angular/common';
import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {QueueActions, QueueSelector} from '../../../../+state';
import {Job} from '../../../../+state/jobs/types/Job';
import {rebaseRoutePath, RoutePath} from '../../../../app.routes';

@Component({
  selector: 'app-queued-jobs-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    MatButton,
    RouterLink,
  ],
  templateUrl: './queued-jobs-page.component.html',
  styleUrl: './queued-jobs-page.component.scss',
})
export class QueuedJobsPageComponent {
  protected readonly queuedJobs$: Observable<Job[]>;

  constructor(private readonly store: Store) {
    this.queuedJobs$ = this.store.select(QueueSelector.selectJobs());
  }

  removeJobFromQueue(job: Job) {
    this.store.dispatch(QueueActions.removeJobFromQueue({jobToRemove: job}));
  }

  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
}
