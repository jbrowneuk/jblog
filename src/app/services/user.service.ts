import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Inject, Injectable, Optional } from '@angular/core';

import { BASE_PATH } from '../variables';
import { RestService } from './rest.service';

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

  /**
   * An observable that updates with the current user
   */
  public get authenticatedUser$(): Observable<User> {
    return this.userSubject.asObservable();
  }

  /**
   * A value that signifies whether a user is logged in or not
   */
  public get isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  /**
   * Accesses the token reflection endpoint to get the current user
   */
  public fetchUser(): Observable<User> {
    const url = `${this.basePath}${API_URL}`;
    return this.authGet<User>(url).pipe(
      tap(user => this.userSubject.next(user)),
      catchError(err => {
        this.endSession();
        return throwError(err);
      })
    );
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
    return this.restService
      .post(url, body)
      .pipe(
        catchError(this.handleSessionError.bind(this)),
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

  /**
   * Make a HTTP GET request with Authorization headers set
   */
  public authGet<T>(url: string): Observable<T> {
    const token = this.getSession();
    if (!token) {
      return of(null);
    }

    const headers = { Authorization: token };
    return this.restService.get<T>(url, headers);
  }

  /**
   * Make a HTTP POST request with Authorization headers set
   */
  public authPost(url: string, body: { [key: string]: any }): any {
    const token = this.getSession();
    if (!token) {
      return of(null);
    }

    const headers = { Authorization: token };
    return this.restService.post(url, body, headers);
  }

  private handleSessionError(): Observable<void> {
    this.endSession();
    return throwError(new Error('invalid login'));
  }

  private setSession(token: string): void {
    localStorage.setItem(TOKEN_IDENTIFIER, token);
  }

  private getSession(): string {
    return localStorage.getItem(TOKEN_IDENTIFIER);
  }
}
