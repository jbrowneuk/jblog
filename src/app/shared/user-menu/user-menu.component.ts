import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { Transitions } from '../transitions';
import { UserMenuAnimation } from './user-menu.component.animations';

@Component({
  selector: 'jblog-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  animations: [Transitions.visibilityFade, UserMenuAnimation]
})
export class UserMenuComponent implements OnInit {
  constructor(private userService: UserService) {}

  public get user$(): Observable<any> {
    return this.userService.authenticatedUser$;
  }

  ngOnInit() {
    this.fetchUser();
  }

  public logOut(): void {
    this.userService.endSession();
    this.fetchUser();
  }

  private fetchUser(): void {
    this.userService.fetchUser();
  }
}
