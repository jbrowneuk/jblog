import { Component, OnInit }      from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { AlbumData }      from "./album-data.class";
import { AlbumImage }     from "./album-image.class";
import { GalleryService } from "./gallery.service";

@Component({
  providers: [ GalleryService ],
  selector: "jblog-gallery",
  styleUrls: [ "./album-folder.component.sass" ],
  templateUrl: "./album-folder.component.html"
})
export class AlbumFolderComponent implements OnInit {
  public images: AlbumImage[];
  public page: number;
  public totalPages: number;
  public isLoaded: boolean;
  public albumName: string;
  public albumInfo: AlbumData;

  constructor(private imageService: GalleryService, private route: ActivatedRoute) {
    this.isLoaded = false;
    this.page = 1;
    this.totalPages = 1;
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.page = +params["page"] || 1;
      this.totalPages = 1;
      this.albumName = params["album"] || "";
      this.getAlbumData(this.albumName);
      this.getAlbumImageData(this.albumName, this.page);
    });
  }

  public formatGalleries(data: AlbumImage): string {
    return data.galleries.join(", ");
  }

  private getAlbumData(albumName: string): void {
    this.albumInfo = null;

    this.imageService.getAlbumData(albumName)
      .then(response => this.handleAlbumDataResponse(response))
      .catch(e => this.handleAlbumDataResponseFailure(e));
  }

  private getAlbumImageData(albumName: string, page: number): void {
    this.isLoaded = false;
    this.images = [];

    this.imageService.getAlbumImageOverviewData(albumName, page)
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
    this.albumName = data.name;
    this.totalPages = data.totalPages;
    this.albumInfo = data;
  }

  private handleAlbumDataResponseFailure(error: any) {
    console.error("Upstream error occurred", error);
    this.albumInfo = null;
  }
}
