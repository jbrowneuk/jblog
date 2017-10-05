import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { AlbumNameTitlePair, ImageInfo } from '../image-info';

import { ImageService } from '../image.service';
import { TextParsingService } from '../../shared/text-parsing.service';
import { TitleService } from '../../shared/title.service';

/**
 * The component used to display the full-sized image and related metadata, as
 * well as any description provided with it.
 */
@Component({
  selector: 'jblog-image',
  templateUrl: './image.component.html',
  styleUrls: [
    './image.component.scss',
    '../../../shared-sass/content-info-area.scss'
  ]
})
export class ImageComponent implements OnInit {

  /**
   * The image data that describes the view.
   */
  public data: ImageInfo;

  /**
   * Controls whether to add the responsive resize class to the image element.
   */
  public isZoomedOut = true;

  /**
   * Constructor with injected services
   */
  constructor(
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private imageService: ImageService,
    private parser: TextParsingService,
    private titleService: TitleService
  ) { }

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
   * Parses the description text with the {@link TextParsingService}.
   */
  public getParsedContent(): SafeHtml {
    if (!this.data) {
      return '';
    }

    const parsed = this.parser.parse(this.data.description);
    return this.domSanitizer.bypassSecurityTrustHtml(parsed);
  }

  /**
   * Gets the image's primary containing album.
   */
  public getPrimaryAlbum(): AlbumNameTitlePair {
    if (!this.data || this.data.containingAlbums.length === 0) {
      return {name: 'latest', title: 'album'};
    }

    return this.data.containingAlbums[0];
  }

  /**
   * Convenience method to get the image data from the {@link ImageService}.
   */
  private requestImageById(imageId: number): void {
    this.data = null;

    this.imageService.getImageInfo(imageId).subscribe(
      res => this.handleImageResponse(res),
      err => console.log('Error: %s', err)
    );
  }

  /**
   * Convenience method to handle the response from the {@link ImageService}.
   */
  private handleImageResponse(response: ImageInfo): void {
    this.data = response;
    this.titleService.setTitle(response.title);
  }

}
