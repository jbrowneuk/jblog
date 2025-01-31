import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User, UserService } from '../../services/user.service';

@Component({
    selector: 'jblog-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {
  public loginError: boolean;
  public loginForm: UntypedFormGroup;

  private returnTo?: string;

  constructor(
    private readonly fb: UntypedFormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginError = false;

    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  public ngOnInit() {
    this.route.queryParams.subscribe({
      next: params => (this.returnTo = params['returnTo'])
    });
  }

  public submitForm(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.loginForm?.invalid) {
      return;
    }

    this.loginError = false;

    this.userService
      .initialiseSession(
        this.loginForm?.value.username,
        this.loginForm?.value.password
      )
      .subscribe({
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

  private onLoginComplete(user: User | null): void {
    if (!user) {
      return;
    }

    const route = this.returnTo || 'admin';
    this.router.navigate(['/', route]);
  }
}
