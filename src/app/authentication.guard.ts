import { Observable, of } from 'rxjs';
import { map, skip, switchMap, take } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, NavigationExtras, Route, Router,
    RouterStateSnapshot, UrlSegment
} from '@angular/router';

import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard
  implements CanActivate, CanActivateChild, CanLoad {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkLogin(state.url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkLogin(state.url);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.checkLogin(route.path);
  }

  private checkLogin(url?: string): Observable<boolean> {
    return this.userService.fetchUser().pipe(
      take(1),
      map(user => {
        if (user) {
          return true;
        }

        const navigationOpts = url
          ? { queryParams: { returnTo: url } }
          : undefined;

        this.router.navigate(['/login'], navigationOpts);
        return false;
      })
    );
  }
}
