import { Component, OnInit } from '@angular/core';

import { AlbumInfo } from '../album-info';

import { AlbumService } from '../album.service';

/**
 * The album list component that is used to render a list of album data
 */
@Component({
  selector: 'jblog-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: [
    './album-list.component.sass',
    '../../../shared-sass/content-info-area.sass'
  ]
})
export class AlbumListComponent implements OnInit {

  /**
   * The album list
   */
  public albums: AlbumInfo[];

  /**
   * Constructor
   */
  constructor(private albumService: AlbumService) { }

  /**
   * On component initialization, load albums
   */
  ngOnInit() {
    this.albumService.getAllAlbumInfo().subscribe(
      x => this.albums = x,
      e => console.error('Error: %s', e)
    );
  }

}
