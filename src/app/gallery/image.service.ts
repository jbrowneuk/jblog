import { Injectable } from '@angular/core';
import { Headers, Http, Response }  from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ImageInfo } from './image-info';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const API_URL = "/api/gallery.php";

@Injectable()
export class ImageService {

  constructor(private http: Http) { }

  public getImageInfo(imageId: number): Observable<any> {
    return this.http.get('/assets/mock-image.json')
      .map((response: Response) => response.json().data as ImageInfo)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error.'));
  }

}
