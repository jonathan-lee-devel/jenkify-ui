import {createAction, props} from '@ngrx/store';

import {Job} from '../jobs/types/Job';

const addJobToQueue = createAction('[Queue] Add Job', props<{jobToAdd: Job}>());

const addedJobToQueue = createAction('[Queue] Added Job');

const loadQueue = createAction('[Queue] Load Queue');

const loadedQueue = createAction('[Queue] Loaded Queue', props<{jobs: Job[]}>());

const removeJobFromQueue = createAction('[Queue] Remove Job', props<{jobToRemove: Job}>());

const removedJobFromQueue = createAction('[Queue] Removed Job');

export const QueueActions = {
  addJobToQueue,
  addedJobToQueue,
  loadQueue,
  loadedQueue,
  removeJobFromQueue,
  removedJobFromQueue,
} as const;
