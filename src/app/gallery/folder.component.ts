import { Component, OnInit }      from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { ImageService } from "./image.service";

@Component({
  providers: [ ImageService ],
  selector: "jblog-gallery",
  templateUrl: "./folder.component.html"
})
export class FolderComponent implements OnInit {
  public images: any[];
  public page: number;
  public totalPages: number;
  public isLoaded: boolean;
  public albumInfo: any;

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
      this.getAlbumOverviewData(albumId, requestedPage);
    });
  }

  private getAlbumData(albumId: number): void {
    this.albumInfo = null;

    this.imageService.getAlbumData(albumId)
      .then(response => this.handleAlbumDataResponse(response))
      .catch(e => this.handleAlbumDataResponseFailure(e));
  }

  private getAlbumOverviewData(albumId: number, page: number): void {
    this.isLoaded = false;
    this.images = [];

    this.imageService.getAlbumImageOverviewData(albumId, page)
      .then(response => this.handleImageResponseSuccess(response))
      .catch(e => this.handleImageResponseFailure(e));
  }

  private handleImageResponseSuccess(data: any[]): void {
    this.images = data;
    this.isLoaded = true;
  }

  private handleImageResponseFailure(error: any): void {
    console.error("Upstream error occurred", error);
    this.images = [];
    this.isLoaded = true;
  }

  private handleAlbumDataResponse(data: any): void {
    this.albumInfo = data;
  }

  private handleAlbumDataResponseFailure(error: any) {
    console.error("Upstream error occurred", error);
    this.albumInfo = null;
  }
}
