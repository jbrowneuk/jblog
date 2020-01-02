import { formatDistanceToNow } from 'date-fns';

import { Inject, Pipe, PipeTransform } from '@angular/core';

import { DATE_FNS_CONFIG } from '../variables';

@Pipe({
  name: 'relativeDate'
})
export class RelativeDatePipe implements PipeTransform {
  protected formattingOptions: any;

  constructor(@Inject(DATE_FNS_CONFIG) localeData: any) {
    this.formattingOptions = { locale: localeData.locale, addSuffix: true };
  }

  transform(value: Date): string {
    return formatDistanceToNow(value, this.formattingOptions);
  }
}
