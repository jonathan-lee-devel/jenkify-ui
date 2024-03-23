import {createFeatureSelector, createSelector} from '@ngrx/store';

import {QueueState} from './queue.reducer';

export const QUEUE_FEATURE_NAME = 'queue';

const selectQueueState = createFeatureSelector<QueueState>(QUEUE_FEATURE_NAME);

const selectJobs = () => createSelector(
    selectQueueState,
    (state: QueueState) => state.jobs,
);

export const QueueSelector = {
  selectJobs,
} as const;
