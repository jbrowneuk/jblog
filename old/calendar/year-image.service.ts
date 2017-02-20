import { Injectable } from "@angular/core";

import { YearImage } from "./year-image.class";

const IMAGEDATA = [
  {monthId: 1, fileName: "1_2016.jpg"},
  {monthId: 2, fileName: "2_2016.jpg"},
  {monthId: 3, fileName: "bike_5.jpg"},
  {monthId: 4, fileName: "4_2016.jpg"},
  {monthId: 5, fileName: "5_2016.jpg"},
  {monthId: 6, fileName: ""},
  {monthId: 7, fileName: "littlerocket.jpg"},
  {monthId: 8, fileName: "2016_8.jpg"},
  {monthId: 9, fileName: "trainride-f02.jpg"},
  {monthId: 10, fileName: "hquinn.jpg"},
  {monthId: 11, fileName: ""},
  {monthId: 12, fileName: ""},
];

@Injectable()
export class YearImageService {
  getImages(year: string): Promise<YearImage[]> {
    return Promise.resolve(IMAGEDATA);
  }

  getImage(year: string, monthId: number): Promise<YearImage> {
    return this.getImages(year).then(imageData => imageData.find(image => image.monthId === monthId));
  }
}
