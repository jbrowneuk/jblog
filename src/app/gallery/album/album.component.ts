import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AlbumInfo } from '../album-info';
import { ImageInfo } from '../image-info';

import { AlbumService } from '../album.service';
import { ImageService } from '../image.service';

@Component({
  selector: 'jblog-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.sass', '../../../shared-sass/content-info-area.sass']
})
export class AlbumComponent implements OnInit {

  public images: ImageInfo[];
  public data: AlbumInfo;

  public isLoadingImages = false;
  public isLoadingAlbumData = false;

  public page: number;

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService,
    private albumService: AlbumService
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const albumName = params['name'] || '';
      this.page = params['page'] || 1;

      this.getAlbumData(albumName);
      this.getAlbumImageData(albumName, this.page);
    });
  }

  private getAlbumData(albumName: string): void {
    this.isLoadingAlbumData = true;
    this.albumService.getAlbumInfo(albumName).subscribe(
      x => this.handleAlbumResponse(x),
      e => console.error('Error: %s', e),
      () => console.log('Completed album data request.')
    );
  }

  private handleAlbumResponse(response: AlbumInfo): void {
    this.isLoadingAlbumData = false;
    this.data = response;
  }

  private getAlbumImageData(albumName: string, page: number): void {
    this.isLoadingImages = true;
    this.imageService.getImagesFromAlbum(albumName, 0).subscribe(
      x => this.handleImageResponse(x),
      e => console.log('Error: %s', e),
      () => console.log('Completed image data request.')
    );
  }

  private handleImageResponse(response: ImageInfo[]): void {
    this.isLoadingImages = false;
    this.images = response;
  }

}
