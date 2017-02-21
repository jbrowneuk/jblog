import { Component, OnInit } from '@angular/core';

import { AlbumInfo } from '../album-info';
import { ImageInfo } from '../image-info';

import { ImageService } from '../image.service';

@Component({
  selector: 'jblog-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.sass']
})
export class AlbumComponent implements OnInit {

  private images: ImageInfo[];
  private data: AlbumInfo;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.data = {
      albumId: 1,
      title: 'Test album',
      name: 'test',
      description: 'A test album.\n\nNew line!',
      imagesInAlbum: 3,
      imagesPerPage: 9,
      totalPages: 1,
      iconUrl: 'http://jbrowne.me.uk/art/icons/figures.jpg'
    };

    this.imageService.getImagesFromAlbum(this.data.albumId, 0).subscribe(
      x => this.handleImageResponse(x),
      e => console.log('Error: %s', e),
      () => console.log('Completed')
    );
  }

  private handleImageResponse(response: ImageInfo[]): void {
    this.images = response;
  }

}
