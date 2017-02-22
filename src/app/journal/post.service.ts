import { Injectable } from '@angular/core';
import { Headers, Http, Response }  from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { PostData } from "./post-data";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PostService {

  constructor(private http: Http) { }

  public getPostsForPage(pageNumber: number): Observable<PostData[]> {
    return this.http.get('/assets/mock-data/posts.json')
      .map((response: Response) => response.json().data as PostData[])
      .catch((error: any) => this.errorHandler(error));
  }

  private errorHandler(error: any): Observable<any> {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error.');
  }

}
