import { Observable, throwError as observableThrowError } from 'rxjs';
import { map } from 'rxjs/operators';

import { Inject, Injectable, Optional } from '@angular/core';

import { PostData, PostDataWrapper } from '../model/post-data';
import { BASE_PATH } from '../variables';
import { RestService } from './rest.service';

const API_URL = '/?posts';

/**
 * A service which handles requesting posts and their details from an API
 * backend.
 */
@Injectable({
  providedIn: 'root'
})
export class PostService {
  /**
   * The fallback base URL to use if one is not provided by the environment.
   */
  protected basePath = 'http://localhost/api';

  /**
   * Injecting constructor.
   */
  constructor(
    private rest: RestService,
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

    return this.rest.get<PostDataWrapper>(apiRequestUrl);
  }

  /**
   * Gets a specific post based upon post id.
   *
   * @param {string} postId - the post slug identifier.
   * @return {Observable<PostData>} - an Observable that returns a
   *                                  PostData-implementing object that maps
   *                                  to a single post.
   */
  public getPost(postId: string): Observable<PostData> {
    if (!postId) {
      return observableThrowError(new Error('Post does not exist'));
    }

    const apiRequestUrl = `${this.basePath}${API_URL}&slug=${postId}`;
    return this.rest
      .get<PostData[]>(apiRequestUrl)
      .pipe(map((response: PostData[]) => response[0]));
  }
}
