import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AlbumInfo } from '../album-info';

import { AlbumService } from '../album.service';

@Component({
  selector: 'jblog-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.sass', '../../../shared-sass/content-info-area.sass']
})
export class AlbumComponent implements OnInit {

  public data: AlbumInfo;
  public isLoadingAlbumData = false;
  public page: number;

  private lastLoadedAlbum: string;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const albumName = params['name'] || '';
      this.page = +params['page'] || 1;

      this.getAlbumData(albumName);
    });
  }

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

  private handleAlbumResponse(response: AlbumInfo): void {
    this.isLoadingAlbumData = false;
    this.data = response;
    this.lastLoadedAlbum = response.name;
  }

}
