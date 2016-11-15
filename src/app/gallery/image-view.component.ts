import { Component, OnInit }      from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ActivatedRoute, Params } from "@angular/router";

import { GalleryService } from "./gallery.service";
import { ImageData }      from "./image-data.class";

@Component({
  providers: [ GalleryService ],
  selector: "jblog-image-view",
  templateUrl: "./image-view.component.html"
})
export class ImageViewComponent implements OnInit {
  public image: ImageData;

  constructor(private domSanitizer: DomSanitizer, private imageService: GalleryService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let imageId = +params["id"] || 0;
      if (!imageId || imageId <= 0) {
        return;
      }

      this.requestImageData(imageId);
    });
  }

  public getParsedContent(): SafeHtml {
    if (!this.image) {
      return "";
    }

    const emoji = require("emojione");
    const emojified = emoji.toImage(this.image.description);
    return this.domSanitizer.bypassSecurityTrustHtml(emojified);
  }

  private requestImageData(imageId: number): void {
    this.image = null;
    this.imageService.getImageData(imageId)
      .then(response => this.handleImageResponseSuccess(response))
      .catch(error => this.handleImageResponseFailure(error));
  }

  private handleImageResponseSuccess(response: ImageData): void {
    this.image = response;
  }

  private handleImageResponseFailure(error: any): void {
    console.error("Upstream error occurred: ", error);
  }
}
