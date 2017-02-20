import { Component, Input } from '@angular/core';

import { ImageInfo } from '../image-info';

@Component({
  selector: 'jblog-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.sass']
})
export class ThumbnailComponent {

  @Input() public data: ImageInfo;

  constructor() { }

}
