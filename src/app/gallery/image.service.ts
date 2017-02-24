import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ImageInfo } from './image-info';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = '/api/?gallery';
const DEFAULT_ALBUM_NAME = '_default';

@Injectable()
export class ImageService {

  constructor(private http: Http) { }

  public getImagesFromAlbum(albumName: string, pageId: number): Observable<ImageInfo[]> {
    if (albumName === '') {
      albumName = DEFAULT_ALBUM_NAME;
    }

    const endpoint = `${API_URL}&images&albumName=${albumName}&page=${pageId}`;
    return this.http.get(endpoint)
      .map((response: Response) => response.json().data as ImageInfo[])
      .catch((error: any) => this.errorHandler(error));
  }

  public getImageInfo(imageId: number): Observable<ImageInfo> {
    const endpoint = `${API_URL}&imageData&imageId=${imageId}`;
    return this.http.get(endpoint)
      .map((response: Response) => response.json().data as ImageInfo)
      .catch((error: any) => this.errorHandler(error));
  }

  private errorHandler(error: any): Observable<any> {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error.');
  }
}
