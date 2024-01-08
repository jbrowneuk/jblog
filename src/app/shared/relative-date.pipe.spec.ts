import { enGB } from 'date-fns/locale';

import { RelativeDatePipe } from './relative-date.pipe';

const localeData = { locale: enGB };

class RelativeDatePipeTestWrapper extends RelativeDatePipe {
  public get locale(): string {
    return this.localeId;
  }
}

describe('RelativeDatePipe', () => {
  it('should create an instance when provided locale information', () => {
    const pipe = new RelativeDatePipe(localeData);
    expect(pipe).toBeTruthy();
  });

  it('should create have same localeId as locale information', () => {
    const pipe = new RelativeDatePipeTestWrapper(localeData);

    // locale code is not exposed on the typings, so may disappear
    expect(pipe.locale).toBe((localeData.locale as any).code);
  });

  it('should convert a date to a fuzzy string', () => {
    const date = new Date();
    const pipe = new RelativeDatePipe(localeData);
    const result = pipe.transform(date);

    expect(result).toBe('less than a minute ago');
  });

  it('should convert a date to a d/m/y string if precise option set', () => {
    const date = new Date(2019, 5, 5, 12);
    const pipe = new RelativeDatePipe(localeData);
    const result = pipe.transform(date, { precise: true });

    expect(result).toBe('Jun 5, 2019');
  });

  it('should convert a date to specific format string if precise option and dateFormat set', () => {
    const date = new Date(2019, 5, 5, 12);
    const pipe = new RelativeDatePipe(localeData);
    const result = pipe.transform(date, {
      precise: true,
      dateFormat: 'medium'
    });

    expect(result).toBe('Jun 5, 2019, 12:00:00 PM');
  });
});
