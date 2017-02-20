import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { YearImage }        from "./year-image.class";
import { YearImageService } from "./year-image.service";

const IMAGEDIRECTORY = "http://jbrowne.me.uk/art/images/";
const NOTHUMBNAILPATH = "./images/empty.png";

@Component({
  selector: "jb-monthdetail",
  templateUrl: "./month-detail.component.html",
  providers: [YearImageService]
})
export class MonthDetailComponent implements OnInit {
  public imageData: YearImage;

  constructor(private route: ActivatedRoute, private yearImageService: YearImageService) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    let year = params["year"];
    let monthId = +params["id"];

    this.getImageData(year, monthId);
  }

  hasImageData(): boolean {
    return this.imageData && this.imageData.fileName.length > 0;
  }

  getImagePath(): string {
    return this.imageData ? IMAGEDIRECTORY + this.imageData.fileName : NOTHUMBNAILPATH;
  }

  private getImageData(year: string, month: number) {
    this.yearImageService.getImage(year, month)
      .then(data => this.imageData = data);
  }
}
