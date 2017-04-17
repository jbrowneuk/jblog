import { Inject, Injectable, Optional } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { BASE_PATH } from '../variables';
import { PostData, PostDataWrapper } from './post-data';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = '/?posts';

/**
 * A service which handles requesting posts and their details from an API
 * backend.
 */
@Injectable()
export class PostService {

  /**
   * The fallback base URL to use if one is not provided by the environment.
   */
  protected basePath = 'http://localhost/api';

  /**
   * Injecting constructor.
   */
  constructor(private http: Http, @Optional()@Inject(BASE_PATH) basePath: string) {
    if (basePath) {
      this.basePath = basePath;
    }
  }

  /**
   * Gets all posts on a page.
   *
   * @param {number} pageId - page number to load posts for.
   * @return {Observable<PostDataWrapper>} - an Observable that returns a
   *                                         PostDataWrapper-implementation that
   *                                         contains information relating to a
   *                                         set of posts.
   */
  public getPostsForPage(pageNumber: number): Observable<PostDataWrapper> {
    let apiRequestUrl = `${this.basePath}${API_URL}`;
    if (pageNumber > 0) {
      apiRequestUrl += `&page=${pageNumber}`;
    }

    return this.http.get(apiRequestUrl)
      .catch((error: any) => this.errorHandler(error))
      .map((response: Response) => response.json().data as PostDataWrapper);
  }

  /**
   * Gets a specific post based upon post id.
   *
   * @param {number} postId - the image identifier.
   * @return {Observable<PostData>} - an Observable that returns a
   *                                  PostData-implementing object that maps
   *                                  to a single post.
   */
  public getPost(postId: number): Observable<PostData> {
    if (postId <= 0) {
      return this.errorHandler('Post does not exist');
    }

    const apiRequestUrl = `${this.basePath}${API_URL}&postId=${postId}`;
    return this.http.get(apiRequestUrl)
      .catch((error: any) => this.errorHandler(error))
      .map((response: Response) => response.json().data as PostData);
  }

  /**
   * Wrapper method for error handling
   */
  private errorHandler(error: any): Observable<any> {
    console.error(error);
    const errorMessage = error.json().error || error || 'Server error.';
    return Observable.throw(errorMessage);
  }

}
