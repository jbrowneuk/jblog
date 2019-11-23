import { Injectable, Optional, Inject } from '@angular/core';
import { RestService } from './rest.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { BASE_PATH } from '../variables';
import { tap, catchError } from 'rxjs/operators';

const API_URL = '/?user';
const TOKEN_IDENTIFIER = 'token';

interface User {
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * The fallback base URL to use if one is not provided by the environment.
   */
  protected basePath = 'http://localhost/api';

  private userSubject: BehaviorSubject<User>;

  /**
   * Injecting constructor.
   */
  constructor(
    private restService: RestService,
    @Optional() @Inject(BASE_PATH) basePath: string
  ) {
    if (basePath) {
      this.basePath = basePath;
    }

    this.userSubject = new BehaviorSubject<User>(null);
  }

  public get authenticatedUser$(): Observable<User> {
    return this.userSubject.asObservable();
  }

  /**
   * Accesses the token reflection endpoint to get the current user
   */
  public fetchUser(): Observable<User> {
    const token = this.getSession();
    if (token) {
      const url = `${this.basePath}${API_URL}`;
      const headers = { Authorization: token };
      this.restService.get<User>(url, headers).subscribe({
        next: user => this.userSubject.next(user),
        error: () => {
          this.endSession();
          this.userSubject.next(null);
        }
      });
    }

    return this.userSubject.asObservable();
  }

  /**
   * Initialises the user session
   */
  public initialiseSession(
    username: string,
    password: string
  ): Observable<string> {
    const body = new FormData();
    body.append('username', username);
    body.append('password', password);

    const url = `${this.basePath}${API_URL}`;
    return this.restService.post(url, body).pipe(
      catchError(() => of(null)),
      tap(this.setSession)
    );
  }

  /**
   * Ends a user session
   */
  public endSession(): void {
    localStorage.removeItem(TOKEN_IDENTIFIER);
    this.userSubject.next(null);
  }

  private setSession(token: string): void {
    localStorage.setItem(TOKEN_IDENTIFIER, token);
  }

  private getSession(): string {
    return localStorage.getItem(TOKEN_IDENTIFIER);
  }
}
