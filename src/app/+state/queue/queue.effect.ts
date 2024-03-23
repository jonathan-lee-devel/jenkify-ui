import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map} from 'rxjs';

import {QueueActions} from './queue.actions';
import {Job} from '../jobs/types/Job';


@Injectable()
export class QueueEffects {
  addJob$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(QueueActions.addJobToQueue),
        map(({jobToAdd}) => {
          const queue = this.getQueueFromLocalStorage();
          queue.add(jobToAdd);
          localStorage.setItem('queue', JSON.stringify(Array.from(queue)));
          return QueueActions.addedJobToQueue();
        }),
    );
  });

  removeJob$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(QueueActions.removeJobFromQueue),
        map(({jobToRemove}) => {
          const queue = this.getQueueFromLocalStorage();
          localStorage.setItem('queue', JSON.stringify(Array.from(queue).filter((job) => job.url !== jobToRemove.url)));
          return QueueActions.removedJobFromQueue();
        }),
    );
  });

  loadQueue = createEffect(() => {
    return this.actions$.pipe(
        ofType(QueueActions.loadQueue),
        map(() => {
          const queue = this.getQueueFromLocalStorage();
          return QueueActions.loadedQueue({jobs: Array.from(queue)});
        }),
    );
  });

  constructor(
    private store: Store,
    private actions$: Actions,
  ) {}

  private getQueueFromLocalStorage() {
    let rawQueue = localStorage.getItem('queue');
    if (!rawQueue) {
      localStorage.setItem('queue', JSON.stringify([] as Job[]));
      rawQueue = localStorage.getItem('queue');
      if (!rawQueue) {
        throw new Error('Could not get queue');
      }
    }
    return new Set<Job>(JSON.parse(rawQueue));
  }
}
