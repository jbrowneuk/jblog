import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';

import { AlbumInfo } from '../model/album-info';
import { BASE_PATH } from '../variables';

const API_URL = '/?gallery';
const DEFAULT_ALBUM_NAME = '_default';

/**
 * A service which handles requesting albums and their details from an API
 * backend.
 */
@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  /**
   * The fallback base URL to use if one is not provided by the environment.
   */
  protected basePath = 'http://localhost/api';

  /**
   * Injecting constructor.
   */
  constructor(
    private http: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string
  ) {
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
    return this.http.get<AlbumInfo[]>(requestUrl);
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
    return this.http.get<AlbumInfo>(endpoint);
  }
}
