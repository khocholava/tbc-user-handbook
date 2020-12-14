import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {QueryUsers} from './user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<boolean> {
  constructor(
    readonly store: Store
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.dispatch(new QueryUsers({_page: 1, _limit: 5}));
  }
}
