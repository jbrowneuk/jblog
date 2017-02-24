import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { PostData } from './post-data';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = '/api/?posts';

@Injectable()
export class PostService {

  constructor(private http: Http) { }

  public getPostsForPage(pageNumber: number): Observable<PostData[]> {
    let apiRequestUrl = API_URL;
    if (pageNumber > 0) {
      apiRequestUrl += `&page=${pageNumber}`;
    }

    return this.http.get(apiRequestUrl)
      .catch((error: any) => this.errorHandler(error))
      .map((response: Response) => response.json().data as PostData[]);
  }

  public getPost(id: number): Observable<PostData> {
    if (id <= 0) {
      return this.errorHandler('Post does not exist');
    }

    const apiRequestUrl = `${API_URL}&postId=${id}`;
    return this.http.get(apiRequestUrl)
      .catch((error: any) => this.errorHandler(error))
      .map((response: Response) => response.json().data as PostData);
  }

  private errorHandler(error: any): Observable<any> {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error.');
  }

}
