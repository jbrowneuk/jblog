import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, UserService } from '../../services/user.service';

@Component({
  selector: 'jblog-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  public get user$(): Observable<User | null> {
    return this.userService.authenticatedUser$;
  }

  ngOnInit() {
    this.userService.fetchUser();
  }

  public logout(evt: Event): void {
    if (evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }

    this.userService.endSession();
    this.userService.fetchUser();

    this.router.navigate(['/login']);
  }
}
