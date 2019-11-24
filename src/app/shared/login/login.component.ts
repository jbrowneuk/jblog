import { Component, Output, EventEmitter } from '@angular/core';
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

  constructor(private userService: UserService) {
    this.loginError = false;
  }

  public submitForm(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();

    this.loginError = false;

    this.userService.initialiseSession(this.username, this.password).subscribe({
      error: () => (this.loginError = true),
      complete: this.fetchUserInfo.bind(this)
    });
  }

  // should probably be elsewhere
  private fetchUserInfo(): void {
    this.userService.fetchUser().subscribe({
      error: err => console.error(err)
    });
  }
}
