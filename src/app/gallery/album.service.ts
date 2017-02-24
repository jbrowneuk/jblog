import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AlbumInfo } from './album-info';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = '/api/?gallery';
const DEFAULT_ALBUM_NAME = '_default';

@Injectable()
export class AlbumService {

  constructor(private http: Http) { }

  public getAlbumInfo(albumName: string): Observable<AlbumInfo> {
    if (albumName === '') {
      albumName = DEFAULT_ALBUM_NAME;
    }

    const endpoint = `${API_URL}&albumData&albumName=${albumName}`;
    return this.http.get(endpoint)
      .map((response: Response) => response.json().data as AlbumInfo)
      .catch((error: any) => this.errorHandler(error));
  }

  private errorHandler(error: any): Observable<any> {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error.');
  }
}
