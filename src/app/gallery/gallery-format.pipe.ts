import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'galleryFormat'
})
export class GalleryFormatPipe implements PipeTransform {

  transform(value: string[], args?: any): any {
    if (value.length === 0) {
      return 'None';
    }

    return value.join(', ');
  }

}
