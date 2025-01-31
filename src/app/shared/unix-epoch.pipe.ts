import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'unixEpoch',
    standalone: false
})
export class UnixEpochPipe implements PipeTransform {
  transform(value: number): Date {
    return new Date(value * 1000);
  }
}
