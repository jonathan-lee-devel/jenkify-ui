import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {filter, map, switchMap} from 'rxjs';

import {JobsActions} from './jobs.actions';
import {JobsSelector} from './jobs.selector';
import {JobsService} from '../../services/jobs/jobs.service';


@Injectable()
export class JobsEffects {
  loadJobs$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(JobsActions.loadJobs),
        switchMap(() => this.jobsService.getJobs()),
        map((jobs) => JobsActions.loadedJobs({jobsToAdd: jobs})),
    );
  });

  getJobs$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(JobsActions.getJobs),
        switchMap(() => this.store.select(JobsSelector.selectJobsLoadingState())),
        filter((loadingState) => loadingState === 'NOT_LOADED'),
        map(() => JobsActions.loadJobs()),
    );
  });

  constructor(
    private store: Store,
    private actions$: Actions,
    private jobsService: JobsService,
  ) {}
}
