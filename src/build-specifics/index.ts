import {EnvironmentProviders} from '@angular/core';
import {provideStoreDevtools} from '@ngrx/store-devtools';

export const extModules: EnvironmentProviders[] = [
  provideStoreDevtools({maxAge: 25}),
];
