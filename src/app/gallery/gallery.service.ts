import { Injectable }               from "@angular/core";
import { Headers, Http, Response }  from "@angular/http";

import "rxjs/add/operator/toPromise";

import { AlbumData }  from "./album-data.class";
import { AlbumImage } from "./album-image.class";

const API_URL = "/api/gallery.php";

@Injectable()
export class GalleryService {
  constructor(private http: Http) {}

  // This could be an end-all gallery service tbh
  public getAlbumData(albumId: number): Promise<any> {
    if (isNaN(albumId) || albumId < 0) {
      albumId = 0;
    }

    let requestUrl = `${API_URL}?albumdata&albumId=${albumId}`;
    return this.http.get(requestUrl)
      .toPromise()
      .then(this.handleAlbumDataResponseSuccess)
      .catch(this.handleError);
  }

  public getAlbumImageOverviewData(albumId: number = 0, pageNumber: number = 1, amountToLoad: number = 0): Promise<AlbumImage[]> {
    if (isNaN(albumId) || albumId < 0) {
      albumId = 0;
    }

    if (isNaN(pageNumber) || pageNumber < 0) {
      pageNumber = 1;
    }

    let requestUrl = `${API_URL}?images&albumId=${albumId}&page=${pageNumber}`;

    if (!isNaN(amountToLoad) && amountToLoad > 0) {
      requestUrl += `&count=${amountToLoad}`;
    }

    return this.http.get(requestUrl)
      .toPromise()
      .then(this.handleAlbumImageOverviewResponseSuccess)
      .catch(this.handleError);
  }

  private handleAlbumImageOverviewResponseSuccess(response: Response): AlbumImage[] {
    return response.json().data as AlbumImage[];
  }

  private handleAlbumDataResponseSuccess(response: Response): AlbumData {
    return response.json().data as AlbumData;
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
