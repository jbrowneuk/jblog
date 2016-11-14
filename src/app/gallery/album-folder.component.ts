import { Component, OnInit }      from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { AlbumData }    from "./album-data.class";
import { AlbumImage }   from "./album-image.class";
import { ImageService } from "./image.service";

@Component({
  providers: [ ImageService ],
  selector: "jblog-gallery",
  templateUrl: "./album-folder.component.html"
})
export class AlbumFolderComponent implements OnInit {
  public images: AlbumImage[];
  public page: number;
  public totalPages: number;
  public isLoaded: boolean;
  public albumInfo: AlbumData;

  constructor(private imageService: ImageService, private route: ActivatedRoute) {
    this.isLoaded = false;
    this.page = 1;
    this.totalPages = 1;
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let requestedPage = +params["page"];
      let albumId = 0;
      this.getAlbumData(albumId);
      this.getAlbumImageData(albumId, requestedPage);
    });
  }

  public formatGalleries(data: AlbumImage): string {
    return data.galleries.join(", ");
  }

  private getAlbumData(albumId: number): void {
    this.albumInfo = null;

    this.imageService.getAlbumData(albumId)
      .then(response => this.handleAlbumDataResponse(response))
      .catch(e => this.handleAlbumDataResponseFailure(e));
  }

  private getAlbumImageData(albumId: number, page: number): void {
    this.isLoaded = false;
    this.images = [];

    this.imageService.getAlbumImageOverviewData(albumId, page)
      .then(response => this.handleImageResponseSuccess(response))
      .catch(e => this.handleImageResponseFailure(e));
  }

  private handleImageResponseSuccess(data: AlbumImage[]): void {
    this.images = data;
    this.isLoaded = true;
  }

  private handleImageResponseFailure(error: any): void {
    console.error("Upstream error occurred", error);
    this.images = [];
    this.isLoaded = true;
  }

  private handleAlbumDataResponse(data: AlbumData): void {
    this.albumInfo = data;
  }

  private handleAlbumDataResponseFailure(error: any) {
    console.error("Upstream error occurred", error);
    this.albumInfo = null;
  }
}
