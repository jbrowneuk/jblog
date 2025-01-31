import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AlbumNameTitlePair, ImageInfo } from '../../model/image-info';
import { ImageService } from '../../services/image.service';
import { TitleService } from '../../shared/title.service';

/**
 * The component used to display the full-sized image and related metadata, as
 * well as any description provided with it.
 */
@Component({
    selector: 'jblog-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss'],
    standalone: false
})
export class ImageComponent implements OnInit {
  /**
   * The image data that describes the view.
   */
  public data?: ImageInfo;

  /**
   * Controls whether to add the responsive resize class to the image element.
   */
  public isZoomedOut = true;

  /**
   * Control variable set when the data for an image is loading.
   */
  public isLoading = false;

  /**
   * Control variable set when the data for an image has failed to load.
   */
  public hasError = false;

  /**
   * Constructor with injected services
   */
  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService,
    private titleService: TitleService
  ) {}

  /**
   * Called when the component is initialized. Used to get image data from a
   * service.
   */
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const imageId = +params['id'];

      if (!imageId || imageId <= 0) {
        return;
      }

      this.requestImageById(imageId);
    });
  }

  /**
   * Called by the UI when the zoom button is activated.
   */
  public toggleZoom(event: Event): void {
    event.preventDefault();
    this.isZoomedOut = !this.isZoomedOut;
  }

  /**
   * Gets the image's primary containing album.
   */
  public getPrimaryAlbum(): AlbumNameTitlePair {
    if (!this.data || this.data.containingAlbums.length === 0) {
      return { name: 'latest', title: 'album' };
    }

    return this.data.containingAlbums[0];
  }

  /**
   * Convenience method to get the image data from the {@link ImageService}.
   */
  private requestImageById(imageId: number): void {
    this.data = undefined;
    this.isLoading = true;
    this.hasError = false;

    this.imageService.getImageInfo(imageId).subscribe({
      next: res => this.handleImageResponse(res),
      error: err => {
        this.hasError = true;
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  /**
   * Convenience method to handle the response from the {@link ImageService}.
   */
  private handleImageResponse(response: ImageInfo): void {
    this.data = response;
    this.titleService.setTitle(response.title);
    this.isLoading = false;
  }
}
