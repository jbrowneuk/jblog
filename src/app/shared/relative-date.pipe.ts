import { formatDistanceToNow } from 'date-fns';

import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID, Optional, Pipe, PipeTransform } from '@angular/core';

import { DATE_FNS_CONFIG } from '../variables';

@Pipe({
  name: 'relativeDate'
})
export class RelativeDatePipe implements PipeTransform {
  private formattingOptions: any;

  protected localeId: string;

  constructor(@Inject(DATE_FNS_CONFIG) localeData: any) {
    this.formattingOptions = { locale: localeData.locale, addSuffix: true };
    this.localeId = localeData.locale.code;
  }

  transform(value: Date, params?: any): string {
    if (params && params.precise) {
      const format = params.dateFormat || 'mediumDate';
      return formatDate(value, format, this.localeId || 'en-GB');
    }

    return formatDistanceToNow(value, this.formattingOptions);
  }
}
