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

  constructor(private userService: UserService) {}

  public submitForm(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();

    this.userService.initialiseSession(this.username, this.password).subscribe({
      error: err => console.error(err),
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
