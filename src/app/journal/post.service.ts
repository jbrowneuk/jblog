
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {map, catchError} from 'rxjs/operators';
import { Inject, Injectable, Optional } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { BASE_PATH } from '../variables';
import { PostData, PostDataWrapper } from './post-data';





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
  constructor(
    private http: Http,
    @Optional()
    @Inject(BASE_PATH)
    basePath: string
  ) {
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
  public getPostsForPage(
    pageNumber: number,
    tag?: string
  ): Observable<PostDataWrapper> {
    let apiRequestUrl = `${this.basePath}${API_URL}`;
    if (pageNumber > 0) {
      apiRequestUrl += `&page=${pageNumber}`;
    }

    if (tag && tag !== null) {
      apiRequestUrl += `&tag=${tag}`;
    }

    return this.http
      .get(apiRequestUrl).pipe(
      map((response: Response) => response.json().data as PostDataWrapper),
      catchError((error: any) => this.errorHandler(error)),);
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
      return observableThrowError(new Error('Post does not exist'));
    }

    const apiRequestUrl = `${this.basePath}${API_URL}&postId=${postId}`;
    return this.http
      .get(apiRequestUrl).pipe(
      map((response: Response) => response.json().data[0] as PostData),
      catchError((error: any) => this.errorHandler(error)),);
  }

  /**
   * Wrapper method for error handling
   */
  private errorHandler(error: any): Observable<any> {
    throw error || new Error('server error');
  }
}
