import {createReducer, on} from '@ngrx/store';

import {JobsActions} from './jobs.actions';
import {Job} from './types/Job';

export type LoadingState = 'NOT_LOADED' | 'LOADING' | 'LOADED';

export interface JobsState {
  jobs: Job[];
  loadingState: LoadingState;
}

const initialState: JobsState = {
  jobs: [],
  loadingState: 'NOT_LOADED',
};

export const jobsReducer = createReducer(
    initialState,
    on(JobsActions.loadJobs, (state): JobsState => {
      return {...state, loadingState: 'LOADING'};
    }),
    on(JobsActions.loadedJobs, (state, {jobsToAdd}): JobsState => {
      return {...state, jobs: [...jobsToAdd], loadingState: 'LOADED'};
    }),
);
