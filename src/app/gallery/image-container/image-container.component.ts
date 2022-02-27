import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ImageInfo } from '../../model/image-info';
import { ImageService } from '../../services/image.service';

const defaultExpectedImages = 16;

/**
 * The component that is used to load image data and display a thumbnail grid of
 * images that are either grouped by a specific tag or folder.
 */
@Component({
  selector: 'jblog-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss']
})
export class ImageContainerComponent implements OnChanges {
  /**
   * The name of the album to load images from.
   */
  @Input() public albumName: string = '';

  /**
   * The current page to display.
   */
  @Input() public page = 1;

  /**
   * A customisable number of images to load. If zero or negative, uses the
   * default value provided by the service.
   */
  @Input() public imageCount = -1;

  /**
   * A collection of {@link ImageInfo} that describe the thumbnails to be
   * rendered in the view.
   */
  public images: ImageInfo[] = [];

  /**
   * A boolean used to signify whether the image data is loading. Used to show
   * loading feedback to the user.
   */
  public isLoadingImages = false;

  /**
   * A boolean used to signify whether the image data loading has failed. Used
   * to show feedback to the user.
   */
  public loadingFailed = false;

  /**
   * Constructor with injected services.
   */
  constructor(private imageService: ImageService) {}

  /**
   * Expected number of images to display. Used for loading placeholder
   */
  public get imagePlaceholders(): any[] {
    const placeholderCount =
      this.imageCount && this.imageCount <= 0
        ? defaultExpectedImages
        : this.imageCount;
    return new Array(placeholderCount).fill(null);
  }

  /**
   * Called when a property changes. Used to detect if the album or page has
   * changed and loads relevant image data.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['page'] && !changes['albumName']) {
      return;
    }

    this.getAlbumImageData();
  }

  /**
   * Convenience method to get image data.
   */
  private getAlbumImageData(): void {
    this.isLoadingImages = true;
    this.loadingFailed = false;
    this.imageService
      .getImagesFromAlbum(this.albumName, this.page, this.imageCount)
      .subscribe({
        next: this.handleImageResponse.bind(this),
        error: this.handleImageLoadFailure.bind(this),
        complete: this.handleImageRequestComplete.bind(this)
      });
  }

  /**
   * Convenience method to handle the response from the image service.
   */
  private handleImageResponse(response: ImageInfo[]): void {
    this.images = response;
  }

  /**
   * Convenience method to handle a failure response from the image service.
   */
  private handleImageLoadFailure(error: Error): void {
    this.loadingFailed = true;
    console.log('Error: %s', error);
  }

  /**
   * Convenience method  to handle actions on success or failure of the image request.
   */
  private handleImageRequestComplete(): void {
    this.isLoadingImages = false;
  }
}
