import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Project } from './project';

/**
 * A service which handles requesting projects and their details from an API
 * backend.
 */
@Injectable()
export class ProjectService {

  /**
   * Injecting constructor.
   */
  constructor(private http: HttpClient) { }

  /**
   * Calls out to the backend and gets a list of projects.
   *
   * @param pageNumber {number} the page number to load.
   * @param amount {number} optional number of projects to load.
   */
  public getProjects(pageNumber: number, amount: number = 0): Observable<Project[]> {
    if (amount <= 0) {
      amount = 8;
    }

    return this.http.get<Project[]>('/assets/mock-data/projects.json')
      .pipe(map(project => project.slice(0, amount)));
  }

}
