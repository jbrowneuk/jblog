import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AlbumInfo } from './album-info';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AlbumService {

  constructor(private http: Http) { }

  public getAlbumInfo(albumName: string): Observable<AlbumInfo> {
    return this.http.get('/assets/mock-data/album.json')
      .map((response: Response) => response.json().data as AlbumInfo)
      .catch((error: any) => this.errorHandler(error));
  }

  private errorHandler(error: any): Observable<any> {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error.');
  }
}
