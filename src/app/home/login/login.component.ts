import { skip } from 'rxjs/operators';

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'jblog-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public username: string;
  public password: string;
  public loginError: boolean;

  constructor(private userService: UserService, private router: Router) {
    this.loginError = false;
  }

  public submitForm(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();

    this.loginError = false;

    this.userService.initialiseSession(this.username, this.password).subscribe({
      error: () => (this.loginError = true),
      next: this.fetchUserInfo.bind(this)
    });
  }

  private fetchUserInfo(): void {
    // Initial subscribed value is previous; skip
    this.userService
      .fetchUser()
      .pipe(skip(1))
      .subscribe({
        next: this.onLoginComplete.bind(this),
        error: err => console.error(err)
      });
  }

  private onLoginComplete(user: any): void {
    const route = user ? '/admin' : '/';
    this.router.navigate([route]);
  }
}
