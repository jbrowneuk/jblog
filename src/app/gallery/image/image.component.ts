import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

import { ImageInfo } from '../image-info';

import { ImageService } from '../image.service';

@Component({
  selector: 'jblog-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.sass']
})
export class ImageComponent implements OnInit {

  private data: ImageInfo;
  private isZoomedOut: boolean = true;

  constructor(private route: ActivatedRoute, private imageService: ImageService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let imageId = +params["id"];
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
