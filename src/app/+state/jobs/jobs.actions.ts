import {createAction, props} from '@ngrx/store';

import {Job} from './types/Job';

const loadJobs = createAction('[Jobs] Load Jobs');

const loadedJobs = createAction('[Jobs] Loaded Jobs', props<{jobsToAdd: Job[]}>());

const getJobs = createAction('[Jobs] Get Jobs');

export const JobsActions = {
  loadJobs,
  loadedJobs,
  getJobs,
} as const;
