import { Component, Input } from '@angular/core';

import { ImageInfo } from '../image-info';

/**
 * The component that represents an image thumbnail.
 */
@Component({
  selector: 'jblog-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent {

  /**
   * Th image data that describes the related image.
   */
  @Input() public data: ImageInfo;

}
