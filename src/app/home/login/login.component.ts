import { combineLatest } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'jblog-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public loginError: boolean;

  private returnTo: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginError = false;
  }

  public ngOnInit() {
    this.route.queryParams.subscribe({
      next: params => (this.returnTo = params.returnTo)
    });
  }

  public submitForm(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();

    this.loginError = false;

    this.userService.initialiseSession(this.username, this.password).subscribe({
      next: this.fetchUserInfo.bind(this),
      error: () => (this.loginError = true)
    });
  }

  private fetchUserInfo(): void {
    this.userService.fetchUser().subscribe({
      next: this.onLoginComplete.bind(this),
      error: () => (this.loginError = true)
    });
  }

  private onLoginComplete(user: any): void {
    if (!user) {
      return;
    }

    const route = this.returnTo || 'admin';
    this.router.navigate(['/', route]);
  }
}
