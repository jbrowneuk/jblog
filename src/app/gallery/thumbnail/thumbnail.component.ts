import { Component, HostBinding, Input } from '@angular/core';

import { ImageInfo } from '../../model/image-info';

/**
 * The component that represents an image thumbnail.
 */
@Component({
    selector: 'jblog-thumbnail',
    templateUrl: './thumbnail.component.html',
    styleUrls: ['./thumbnail.component.scss'],
    standalone: false
})
export class ThumbnailComponent {
  private _isPromoted = false;

  /**
   * The image data that describes the related image.
   */
  @Input() public data?: ImageInfo;

  /**
   * Whether this image should be promoted (i.e. larger).
   */
  @Input() set isPromoted(value: boolean) {
    this._isPromoted = value;
  }

  @HostBinding('class.large') get isLarge(): boolean {
    return this._isPromoted;
  }

  @HostBinding('class.horizontal') get isHorizontal(): boolean {
    return this._isPromoted && !!this.data && this.data.horizontal;
  }

  @HostBinding('class.vertical') get isVertical(): boolean {
    return this._isPromoted && !!this.data && !this.data.horizontal;
  }
}
