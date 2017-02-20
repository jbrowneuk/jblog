import { Component, OnInit } from '@angular/core';

import { AlbumInfo } from '../album-info';
import { ImageInfo } from '../image-info';

@Component({
  selector: 'jblog-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.sass']
})
export class AlbumComponent implements OnInit {

  private images: ImageInfo[];
  private data: AlbumInfo;

  constructor() { }

  ngOnInit() {
    this.images = [
      { imageId: 1, title: 'Image 1', galleries: ['gallery 1', 'gallery 2'], thumbnailUrl: 'http://jbrowne.me.uk/art/thumbs/hat_thief.jpg' },
      { imageId: 2, title: 'Image 2', galleries: ['gallery 3', 'gallery 4'], thumbnailUrl: 'http://jbrowne.me.uk/art/thumbs/hat_thief.jpg' },
    ];
    this.data = {
      albumId: 1,
      title: 'Test album',
      name: 'test',
      description: 'A test album',
      imagesInAlbum: 2,
      imagesPerPage: 9,
      totalPages: 1,
      iconUrl: ''
    };
  }

}
