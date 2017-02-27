import { Pipe, PipeTransform } from '@angular/core';

import { AlbumNameTitlePair } from './image-info';

@Pipe({
  name: 'galleryFormat'
})
export class GalleryFormatPipe implements PipeTransform {

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
