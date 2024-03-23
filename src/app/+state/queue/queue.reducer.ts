import {createReducer, on} from '@ngrx/store';

import {QueueActions} from './queue.actions';
import {Job} from '../jobs/types/Job';

export interface QueueState {
  jobs: Job[];
}

const initialState: QueueState = {
  jobs: [],
};

export const queueReducer = createReducer(
    initialState,
    on(QueueActions.addJobToQueue, (state, {jobToAdd}): QueueState => {
      return {...state, jobs: [...state.jobs, jobToAdd]};
    }),
    on(QueueActions.removeJobFromQueue, (state, {jobToRemove}): QueueState => {
      return {...state, jobs: [...state.jobs.filter((job) => job.url !== jobToRemove.url)]};
    }),
    on(QueueActions.loadedQueue, (state, {jobs}): QueueState => {
      return {...state, jobs: [...jobs]};
    }),
);
