import { Component, OnInit } from "@angular/core";

import { YearImage }        from "./year-image.class";
import { YearImageService } from "./year-image.service";

const THUMBNAILDIRECTORY = "http://jbrowne.me.uk/art/thumbs/";
const NOTHUMBNAILPATH = "/public/images/calendar/empty.png";

@Component({
  selector: "jb-yearoverview",
  templateUrl: "./year-overview.component.html",
  providers: [YearImageService]
})
export class YearOverviewComponent implements OnInit {
  public year: string;
  public imageData: YearImage[];

  constructor(private yearImageService: YearImageService) {
    this.year = "2016";
  }

  ngOnInit(): void {
    this.getImageData();
  }

  getSafeFileName(image: YearImage): string {
    if (image.fileName.length > 0) {
      return THUMBNAILDIRECTORY + image.fileName;
    }

    return NOTHUMBNAILPATH;
  }

  getMonthName(image: YearImage) {
    switch (image.monthId) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "";
    }
  }

  private getImageData(): void {
    this.yearImageService.getImages(this.year)
      .then(data => this.imageData = data);
  }
}
