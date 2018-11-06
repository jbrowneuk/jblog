import {throwError as observableThrowError,  Observable } from 'rxjs';

import {map, catchError} from 'rxjs/operators';
import { Inject, Injectable, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';

import { BASE_PATH } from '../variables';
import { ImageInfo } from './image-info';

const API_URL = '/?gallery';
const DEFAULT_ALBUM_NAME = '_default';

/**
 * A service which handles requesting images and their details from an API
 * backend.
 */
@Injectable()
export class ImageService {

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
   * Gets all images on a page from a specified album.
   *
   * @param {string} albumName - a string containing the textual album name.
   * @param {number} pageId - page number to load images for.
   * @param {number} [count] - amount of images to load.
   * @return {Observable<ImageInfo[]>} - an Observable that returns an array of
   *                                     ImageInfo-implementing objects that map
   *                                     to album images.
   */
  public getImagesFromAlbum(albumName: string, pageId: number, count: number = 0): Observable<ImageInfo[]> {
    if (albumName === '') {
      albumName = DEFAULT_ALBUM_NAME;
    }

    if (pageId <= 0) {
      pageId = 1;
    }

    let endpoint = `${this.basePath}${API_URL}&images&albumName=${albumName}&page=${pageId}`;

    if (count && count > 0) {
      endpoint += `&count=${count}`;
    }

    return this.http.get(endpoint).pipe(
      map((response: Response) => response.json().data as ImageInfo[]),
      catchError((error: any) => this.errorHandler(error)));
  }

  /**
   * Gets a specific image based upon image id.
   *
   * @param {number} imageId - the image identifier.
   * @return {Observable<ImageInfo>} - an Observable that returns an
   *                                   ImageInfo-implementing object that maps
   *                                   to a single image.
   */
  public getImageInfo(imageId: number): Observable<ImageInfo> {
    const endpoint = `${this.basePath}${API_URL}&imageData&imageId=${imageId}`;
    return this.http.get(endpoint).pipe(
      map((response: Response) => response.json().data as ImageInfo),
      catchError((error: any) => this.errorHandler(error)));
  }

  /**
   * Generic error handler.
   *
   * @return {Observable<any>} - an observable that throws and wraps the error
   *                             when subscribed to.
   */
  private errorHandler(error: any): Observable<any> {
    console.error(error);
    return observableThrowError(error.json().error || 'Server error.');
  }
}
