import { Injectable }               from "@angular/core";
import { Headers, Http, Response }  from "@angular/http";

import "rxjs/add/operator/toPromise";

import { AlbumData }  from "./album-data.class";
import { AlbumImage } from "./album-image.class";
import { ImageData }  from "./image-data.class";

const API_URL = "/api/gallery.php";
const DEFAULT_ALBUM_NAME = "_default";

@Injectable()
export class GalleryService {
  constructor(private http: Http) {}

  /**
   * Gets album data for a named album.
   *
   * @param {string} albumName - a string containing the textual album name.
   * @return {Promise<any>} - a promise that resolves to an AlbumData object or
   *                          rejects with an error message of type string.
   */
  public getAlbumData(albumName: string = ""): Promise<any> {
    if (albumName === "") {
      albumName = DEFAULT_ALBUM_NAME;
    }

    let requestUrl = `${API_URL}?albumdata&albumName=${albumName}`;
    return this.http.get(requestUrl)
      .toPromise()
      .then(this.handleAlbumDataResponseSuccess)
      .catch(this.handleError);
  }

  /**
   * Gets album data for a named album.
   *
   * @param {string} albumName - a string containing the textual album name.
   * @return {Promise<any>} - a promise that resolves to an AlbumData object or
   *                          rejects with an error message of type string.
   */
  public getAllAlbumData(): Promise<any> {
    let requestUrl = `${API_URL}?albumdata&fullList`;
    return this.http.get(requestUrl)
      .toPromise()
      .then(this.handleAllAlbumDataResponseSuccess)
      .catch(this.handleError);
  }

  /**
   * Gets image data for the image with the specified id.
   */
  public getImageData(imageId: number): Promise<any> {
    if (isNaN(imageId) || imageId < 0) {
      return Promise.reject("invalid image ID");
    }

    let requestUrl = `${API_URL}?imagedata&imageId=${imageId}`;
    return this.http.get(requestUrl)
      .toPromise()
      .then(this.handleImageDataResponseSuccess)
      .catch(this.handleError);
  }

  public getAlbumImageOverviewData(albumName: string = "", pageNumber: number = 1, amountToLoad: number = 0): Promise<AlbumImage[]> {
    if (albumName === "") {
      albumName = DEFAULT_ALBUM_NAME;
    }

    if (isNaN(pageNumber) || pageNumber < 0) {
      pageNumber = 1;
    }

    let requestUrl = `${API_URL}?images&albumName=${albumName}&page=${pageNumber}`;

    if (!isNaN(amountToLoad) && amountToLoad > 0) {
      requestUrl += `&count=${amountToLoad}`;
    }

    return this.http.get(requestUrl)
      .toPromise()
      .then(this.handleAlbumImageOverviewResponseSuccess)
      .catch(this.handleError);
  }

  private handleAlbumDataResponseSuccess(response: Response): AlbumData {
    return response.json().data as AlbumData;
  }

  private handleAllAlbumDataResponseSuccess(response: Response): AlbumData[] {
    return response.json().data as AlbumData[];
  }

  private handleImageDataResponseSuccess(response: Response): ImageData {
    return response.json().data as ImageData;
  }

  private handleAlbumImageOverviewResponseSuccess(response: Response): AlbumImage[] {
    return response.json().data as AlbumImage[];
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
