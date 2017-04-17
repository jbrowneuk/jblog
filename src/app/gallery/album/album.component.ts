import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AlbumInfo } from '../album-info';

import { AlbumService } from '../album.service';

/**
 * The component which represents a paginated collection of images that are
 * either grouped by a specific tag or folder.
 */
@Component({
  selector: 'jblog-album',
  templateUrl: './album.component.html',
  styleUrls: [
    './album.component.sass',
    '../../../shared-sass/content-info-area.sass'
  ]
})
export class AlbumComponent implements OnInit {

  /**
   * The album data which describes the current view.
   */
  public data: AlbumInfo;

  /**
   * A boolean used to signify whether the album data is loading. Used to show
   * loading feedback to the user.
   */
  public isLoadingAlbumData = false;

  /**
   * The current page to display.
   */
  public page: number;

  /**
   * A control variable to prevent reloading the same album data.
   */
  private lastLoadedAlbum: string;

  /**
   * Constructor with injected services.
   */
  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService
  ) { }

  /**
   * Called on component initialization. Used to load album data.
   */
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const albumName = params['name'] || '';
      this.page = +params['page'] || 1;

      this.getAlbumData(albumName);
    });
  }

  /**
   * Convenience method to load album data from a service.
   */
  private getAlbumData(albumName: string): void {
    // Only load album data if album has changed.
    if (albumName === this.lastLoadedAlbum) {
      return;
    }

    this.isLoadingAlbumData = true;
    this.albumService.getAlbumInfo(albumName).subscribe(
      x => this.handleAlbumResponse(x),
      e => console.error('Error: %s', e)
    );
  }

  /**
   * Convenience method to handle the album data response from the service.
   */
  private handleAlbumResponse(response: AlbumInfo): void {
    this.isLoadingAlbumData = false;
    this.data = response;
    this.lastLoadedAlbum = response.name;
  }

}
