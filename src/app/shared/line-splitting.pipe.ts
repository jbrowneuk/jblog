import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineSplitting'
})
export class LineSplittingPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.split('\n').filter(String);
  }

}
