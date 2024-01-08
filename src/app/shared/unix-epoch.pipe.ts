import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixEpoch'
})
export class UnixEpochPipe implements PipeTransform {
  transform(value: number): Date {
    return new Date(value * 1000);
  }
}
