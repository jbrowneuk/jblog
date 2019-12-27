import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot,
    UrlSegment
} from '@angular/router';

import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard
  implements CanActivate, CanActivateChild, CanLoad {
  constructor(private userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.userService.isLoggedIn;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.userService.isLoggedIn;
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.userService.isLoggedIn;
  }
}
