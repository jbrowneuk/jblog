import { Component, OnInit } from '@angular/core';

import { AlbumInfo } from '../album-info';

import { AlbumService } from '../album.service';
import { TitleService } from '../../shared/title.service';

/**
 * The album list component that is used to render a list of album data
 */
@Component({
  selector: 'jblog-album-list',
  templateUrl: './album-list.component.html'
})
export class AlbumListComponent implements OnInit {

  /**
   * The album list
   */
  public albums: AlbumInfo[];

  /**
   * Constructor
   */
  constructor(
    private albumService: AlbumService,
    private titleService: TitleService
  ) { }

  /**
   * On component initialization, load albums
   */
  ngOnInit() {
    this.titleService.setTitle('All albums');
    this.albumService.getAllAlbumInfo().subscribe(
      x => this.albums = x,
      e => console.error('Error: %s', e)
    );
  }

}
