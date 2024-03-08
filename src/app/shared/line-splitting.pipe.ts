import { Pipe, PipeTransform } from '@angular/core';

/**
 * A pipe used to transform text with new line characters, `\n`, into an array
 * representing multiple lines with each segment
 */
@Pipe({
  name: 'lineSplitting'
})
export class LineSplittingPipe implements PipeTransform {
  /**
   * Transform a string with new line characters into an array of strings
   * split by line
   */
  transform(value: string): string[] {
    return value.split('\n').filter(String);
  }
}
