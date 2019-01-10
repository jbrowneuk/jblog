import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_PATH } from '../variables';
import { Project } from './project';

const API_URL = '/?projects';

/**
 * A service which handles requesting projects and their details from an API
 * backend.
 */
@Injectable()
export class ProjectService {
  /**
   * The fallback base URL to use if one is not provided by the environment.
   */
  protected basePath = 'http://localhost/api';

  /**
   * Injecting constructor.
   */
  constructor(
    private http: HttpClient,
    @Optional()
    @Inject(BASE_PATH)
    basePath: string
  ) {
    if (basePath) {
      this.basePath = basePath;
    }
  }

  /**
   * Calls out to the backend and gets a list of projects.
   *
   * @param pageNumber {number} the page number to load.
   * @param amount {number} optional number of projects to load.
   */
  public getProjects(
    pageNumber: number,
    amount: number = 0
  ): Observable<Project[]> {
    if (amount <= 0) {
      amount = 8;
    }

    return this.http
      .get<Project[]>(`${this.basePath}${API_URL}`)
      .pipe(map(project => project.slice(0, amount)));
  }
}
