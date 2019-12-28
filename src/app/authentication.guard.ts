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
  ): boolean {
    return this.checkLogin(state.url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkLogin(state.url);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.checkLogin(route.path);
  }

  private checkLogin(url?: string): boolean {
    if (this.userService.isLoggedIn) {
      return true;
    }

    const navigationOpts = url ? { queryParams: { returnTo: url } } : undefined;

    this.router.navigate(['/login'], navigationOpts);
    return false;
  }
}
