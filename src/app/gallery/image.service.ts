import { Injectable }               from "@angular/core";
import { Headers, Http, Response }  from "@angular/http";

import "rxjs/add/operator/toPromise";

@Injectable()
export class ImageService {
  constructor(private http: Http) {}

  // This could be an end-all gallery service tbh
  public getAlbumData(albumId: number): Promise<any> {
    return Promise.resolve({albumId: 0, title: "Album title", description: "Album description"});
  }

  public getAlbumImageOverviewData(albumId: number = 0, pageNumber: number = 0): Promise<any[]> {
    return Promise.resolve([
      {imageId: 1, title: "Title 1 (" + albumId + ")", galleries: "Vector", thumbnailUrl: "http://jbrowne.me.uk/art/thumbs/trainride-f02.jpg"},
      {imageId: 2, title: "Title 2 (" + pageNumber + ")", galleries: "Photography", thumbnailUrl: "http://jbrowne.me.uk/art/thumbs/rain.jpg"}
    ]);
  }
}
