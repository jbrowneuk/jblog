import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ImageInfo } from '../image-info';

import { ImageService } from '../image.service';

@Component({
  selector: 'jblog-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.sass']
})
export class ImageContainerComponent implements OnChanges {

  @Input() public albumName: string;
  @Input() public page: number;
  @Input() public imageCount = -1;

  public images: ImageInfo[];
  public isLoadingImages = false;

  constructor(private imageService: ImageService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['page'] && !changes['albumName']) {
      return;
    }

    this.getAlbumImageData();
  }

  private getAlbumImageData(): void {
    this.isLoadingImages = true;
    this.imageService.getImagesFromAlbum(this.albumName, this.page, this.imageCount).subscribe(
      x => this.handleImageResponse(x),
      e => console.log('Error: %s', e)
    );
  }

  private handleImageResponse(response: ImageInfo[]): void {
    this.isLoadingImages = false;
    this.images = response;
  }

}
