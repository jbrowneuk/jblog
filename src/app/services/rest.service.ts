import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type Headers = { [key: string]: string };

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) {}

  /**
   * Gets a resource from a server
   *
   * @param url url to GET
   * @param headers (option) HTTP request headers
   */
  public get<T>(url: string, headers?: Headers): Observable<T> {
    const options = {
      headers
    };

    return this.http.get<T>(url, options);
  }

  public post<T>(
    url: string,
    body: FormData | { [key: string]: string | number | boolean },
    headers?: Headers
  ): Observable<T> {
    // Caveat: API must return JSON
    const options = {
      headers: headers ? headers : undefined
    };

    return this.http.post<T>(url, body, options);
  }
}
