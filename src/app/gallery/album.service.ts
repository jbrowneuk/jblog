
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Inject, Injectable, Optional } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { BASE_PATH } from '../variables';
import { AlbumInfo } from './album-info';





const API_URL = '/?gallery';
const DEFAULT_ALBUM_NAME = '_default';

/**
 * A service which handles requesting albums and their details from an API
 * backend.
 */
@Injectable()
export class AlbumService {

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
   * Gets all album information from the database.
   *
   * @return {Observable<AlbumInfo[]>} - an Observable that returns an array of
   *                                     AlbumInfo-implementing objects that map
   *                                     to albums.
   */
  public getAllAlbumInfo(): Observable<AlbumInfo[]> {
    const requestUrl = `${this.basePath}${API_URL}&albumData&all`;
    return this.http.get(requestUrl).pipe(
      catchError((error: any) => this.errorHandler(error)),
      map((response: Response) => response.json().data as AlbumInfo[]),);
  }

  /**
   * Gets a specific album based upon name.
   *
   * @param {string} albumName - the album name.
   * @return {Observable<ImageInfo>} - an Observable that returns an
   *                                   AlbumInfo-implementing object that maps
   *                                   to a single album.
   */
  public getAlbumInfo(albumName: string): Observable<AlbumInfo> {
    if (albumName === '') {
      albumName = DEFAULT_ALBUM_NAME;
    }

    const endpoint = `${this.basePath}${API_URL}&albumData&albumName=${albumName}`;
    return this.http.get(endpoint).pipe(
      map((response: Response) => response.json().data as AlbumInfo),
      catchError((error: any) => this.errorHandler(error)),);
  }

  /**
   * Generic error handler.
   *
   * @return {Observable<any>} - an observable that throws and wraps the error
   *                             when subscribed to.
   */
  private errorHandler(error: any): Observable<any> {
    console.log(error);
    return observableThrowError(error.json().error || 'Server error.');
  }
}
