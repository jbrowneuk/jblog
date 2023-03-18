import { Pipe, PipeTransform } from '@angular/core';

import { AlbumNameTitlePair } from '../model/image-info';

/**
 * A pipe used to format the album data attached to an image into a presentable
 * form to dislay to the user
 */
@Pipe({
  name: 'galleryFormat'
})
export class GalleryFormatPipe implements PipeTransform {
  /**
   * Transform a colection of {@link AlbumNameTitlePair} into a comma separated
   * string of album titles
   */
  transform(value: AlbumNameTitlePair[], args?: any): any {
    if (value.length === 0) {
      return 'None';
    }

    const galleryTitles = value.map((obj: AlbumNameTitlePair) => {
      return obj.title;
    });

    return galleryTitles.join(', ');
  }
}
