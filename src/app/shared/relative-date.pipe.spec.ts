import { enGB } from 'date-fns/locale';

import { RelativeDatePipe } from './relative-date.pipe';

const localeData = { locale: enGB };

describe('RelativeDatePipe', () => {
  it('should create an instance when provided a locale', () => {
    const pipe = new RelativeDatePipe(localeData);
    expect(pipe).toBeTruthy();
  });

  it('should convert a date to a string', () => {
    const date = new Date();
    const pipe = new RelativeDatePipe(localeData);
    const result = pipe.transform(date);

    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });
});
