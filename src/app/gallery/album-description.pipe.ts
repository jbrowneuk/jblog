import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'albumDescription'
})
export class AlbumDescriptionPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.split('\n').filter(String);
  }

}
