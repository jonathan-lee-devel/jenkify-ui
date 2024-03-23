import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {delay} from 'rxjs';

import {Job} from '../../+state/jobs/types/Job';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private httpClient: HttpClient) { }

  getJobs() {
    return this.httpClient.get<Job[]>(`${environment.CLIENT_SERVICE_BASE_URL}/jobs`).pipe(delay(2000));
  }
}
