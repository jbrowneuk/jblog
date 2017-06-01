import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Project } from './project';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

/**
 * A service which handles requesting projects and their details from an API
 * backend.
 */
@Injectable()
export class ProjectService {

  /**
   * Constructor that takes an injectable {@link Http} that the component uses
   * during its lifetime to call the backend.
   */
  constructor(private http: Http) { }

  /**
   * Calls out to the backend and gets a list of projects.
   *
   * @param pageNumber {number} the page number to load.
   * @param amount {number} optional number of projects to load.
   */
  public getProjects(pageNumber: number, amount: number = 0): Observable<Project[]> {
    return this.http.get('/assets/mock-data/projects.json')
      .map((response: Response) => this.handleResponse(response, amount))
      .catch((error: any) => this.errorHandler(error));
  }

  /**
   * Generic error handler convenience method - wraps an Observable.throw.
   */
  private errorHandler(error: any): Observable<any> {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error.');
  }

  /**
   * Helper method to handle the response from the backend.
   * Note: since the projects backend is currently hardcoded, the logic contained
   * within this method is more than it should be.
   */
  private handleResponse(response: Response, amountToReturn: number): Project[] {
    const projects = response.json().data as Project[];
    if (amountToReturn > 0) {
      return projects.slice(0, amountToReturn);
    }

    return projects;
  }

}
