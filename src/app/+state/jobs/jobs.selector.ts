import {createFeatureSelector, createSelector} from '@ngrx/store';

import {JobsState} from './jobs.reducer';

export const JOBS_FEATURE_NAME = 'jobs';

const selectJobsState = createFeatureSelector<JobsState>(JOBS_FEATURE_NAME);

const selectJobs = () => createSelector(
    selectJobsState,
    (state: JobsState) => state.jobs
        .map((job) => ({...job, color: (job.color === 'notbuilt') ?
            'Not Built Yet' :
            job?.color?.replace(/(^\w)|(\s+\w)/g, (letter) => letter.toUpperCase())}),
        ),

);

const selectJobsLoadingState = () => createSelector(
    selectJobsState,
    (state: JobsState) => state.loadingState,
);

export const JobsSelector = {
  selectJobs,
  selectJobsLoadingState,
} as const;
