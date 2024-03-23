import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private _isSidebarOpened: BehaviorSubject<boolean>;
  public isSideBarOpened$: Observable<boolean>;

  constructor() {
    this._isSidebarOpened = new BehaviorSubject<boolean>(true);
    this.isSideBarOpened$ = this._isSidebarOpened.asObservable();
  }

  toggleSideBar() {
    this._isSidebarOpened.next(!this._isSidebarOpened.value);
  }
}
