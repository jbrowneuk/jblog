import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ImageInfo } from '../image-info';

import { ImageService } from '../image.service';
import { TextParsingService } from '../../shared/text-parsing.service';

@Component({
  selector: 'jblog-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.sass']
})
export class ImageComponent implements OnInit {

  public data: ImageInfo;
  public isZoomedOut = true;

  constructor(
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private imageService: ImageService,
    private parser: TextParsingService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const imageId = +params['id'];
      if (!imageId || imageId <= 0) {
        return;
      }

      this.requestImageById(imageId);
    });
  }

  public toggleZoom(event: Event): void {
    event.preventDefault();
    this.isZoomedOut = !this.isZoomedOut;
  }

  public getParsedContent(): SafeHtml {
    if (!this.data) {
      return '';
    }

    const parsed = this.parser.parse(this.data.description);
    return this.domSanitizer.bypassSecurityTrustHtml(parsed);
  }

  private requestImageById(imageId: number): void {
    this.data = null;

    this.imageService.getImageInfo(imageId).subscribe(
      res => this.handleImageResponse(res),
      err => console.log('Error: %s', err),
      () => console.log('Completed')
    );
  }

  private handleImageResponse(response: ImageInfo): void {
    this.data = response;
  }

}
