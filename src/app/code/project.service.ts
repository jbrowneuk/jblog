import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Project } from './project';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProjectService {

  constructor(private http: Http) { }

  public getProjectsForPage(pageNumber: 1): Observable<Project[]> {
    return this.http.get('/assets/mock-data/projects.json')
    .map((response: Response) => response.json().data as Project[])
    .catch((error: any) => this.errorHandler(error));
  }

  private errorHandler(error: any): Observable<any> {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error.');
  }

}
