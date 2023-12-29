import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Router, RouterState } from '@angular/router';

import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(routerState: RouterState): Observable<boolean> {
    return this.checkLogin(routerState);
  }

  canActivateChild(routerState: RouterState): Observable<boolean> {
    return this.checkLogin(routerState);
  }

  canLoad(routerState: RouterState): Observable<boolean> {
    return this.checkLogin(routerState);
  }

  private checkLogin(routerState?: RouterState): Observable<boolean> {
    return this.userService.fetchUser().pipe(
      take(1),
      map(user => {
        if (user) {
          return true;
        }

        const navigationOpts = routerState
          ? { queryParams: { returnTo: routerState.snapshot.url } }
          : undefined;

        this.router.navigate(['/login'], navigationOpts);
        return false;
      })
    );
  }
}
