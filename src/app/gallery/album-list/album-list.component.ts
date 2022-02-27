import { Component, OnInit } from '@angular/core';

import { AlbumInfo } from '../../model/album-info';
import { AlbumService } from '../../services/album.service';
import { TitleService } from '../../shared/title.service';

/**
 * The album list component that is used to render a list of album data
 */
@Component({
  selector: 'jblog-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {
  /**
   * The album list
   */
  public albums: AlbumInfo[] = [];

  /**
   * A boolean used to signify whether the image data is loading. Used to show
   * loading feedback to the user.
   */
  public isLoadingAlbums = false;

  /**
   * Constructor
   */
  constructor(
    private albumService: AlbumService,
    private titleService: TitleService
  ) {}

  /**
   * On component initialization, load albums
   */
  ngOnInit() {
    this.titleService.setTitle('All albums');
    this.isLoadingAlbums = true;
    this.albumService.getAllAlbumInfo().subscribe({
      next: this.handleAlbumsResponse.bind(this),
      error: this.handleAlbumsFailure.bind(this),
      complete: this.onLoadingComplete.bind(this)
    });
  }

  private handleAlbumsResponse(albumData: AlbumInfo[]): void {
    this.albums = albumData;
  }

  private handleAlbumsFailure(error: Error): void {
    console.error(error.message);
  }

  private onLoadingComplete(): void {
    this.isLoadingAlbums = false;
  }
}
