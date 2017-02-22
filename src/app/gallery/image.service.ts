import { Injectable } from '@angular/core';
import { Headers, Http, Response }  from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ImageInfo } from './image-info';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = "/api/gallery.php";

@Injectable()
export class ImageService {

  constructor(private http: Http) { }

  public getImagesFromAlbum(albumId: number, pageId: number): Observable<ImageInfo[]> {
    return this.http.get('/assets/mock-images.json')
      .map((response: Response) => response.json().data as ImageInfo[])
      .catch((error: any) => this.errorHandler(error));
  }

  public getImageInfo(imageId: number): Observable<ImageInfo> {
    return this.http.get('/assets/mock-image.json')
      .map((response: Response) => response.json().data as ImageInfo)
      .catch((error: any) => this.errorHandler(error));
  }

  private errorHandler(error: any): Observable<any> {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error.');
  }
}
