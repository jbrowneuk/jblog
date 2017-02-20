import { Component, OnInit }      from "@angular/core";

import { AlbumData }      from "./album-data.class";
import { GalleryService } from "./gallery.service";

@Component({
  providers: [ GalleryService ],
  selector: "jblog-album-list",
  templateUrl: "./album-list.component.html"
})
export class AlbumListComponent implements OnInit {
  public albums: AlbumData[];

  constructor(private imageService: GalleryService) {}

  ngOnInit(): void {
    this.requestAllAlbums();
  }

  private requestAllAlbums(): void {
    this.imageService.getAllAlbumData()
      .then(response => this.albums = response)
      .catch(e => console.error(e));
  }
}
