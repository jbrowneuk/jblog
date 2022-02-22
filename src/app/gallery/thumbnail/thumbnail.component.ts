import { Component, Input } from '@angular/core';

import { ImageInfo } from '../../model/image-info';

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
   * The image data that describes the related image.
   */
  @Input() public data?: ImageInfo;
}
