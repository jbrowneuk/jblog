import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  public post(
    url: string,
    body: { [key: string]: any },
    headers?: Headers
  ): Observable<any> {
    // TODO: remove responseType once API returns JSON
    // https://stackoverflow.com/a/54383818
    const responseType = 'text' as any;
    const options = {
      headers: headers ? headers : undefined,
      responseType
    };

    return this.http.post(url, body, options);
  }
}
