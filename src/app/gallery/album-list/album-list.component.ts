import { Component, OnInit } from '@angular/core';

import { AlbumInfo } from '../album-info';

import { AlbumService } from '../album.service';

@Component({
  selector: 'jblog-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.sass', '../../../shared-sass/content-info-area.sass']
})
export class AlbumListComponent implements OnInit {

  public albums: AlbumInfo[];

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
    this.albumService.getAllAlbumInfo().subscribe(
      x => this.albums = x,
      e => console.error('Error: %s', e),
      () => console.log('Completed album data request.')
    );
  }

}
