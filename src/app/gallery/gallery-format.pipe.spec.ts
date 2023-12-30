import { GalleryFormatPipe } from './gallery-format.pipe';

describe('GalleryFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new GalleryFormatPipe();
    expect(pipe).toBeTruthy();
  });

  it('should concatenate album titles', () => {
    const albumInfo = [
      { title: 'one', name: '' },
      { title: 'two', name: '' },
      { title: 'three', name: '' }
    ];

    const pipe = new GalleryFormatPipe();
    const actualOutput = pipe.transform(albumInfo);

    expect(actualOutput).toBe('one, two, three');
  });

  it('should return ‘None’ if the information array is empty', () => {
    const pipe = new GalleryFormatPipe();
    const actualOutput = pipe.transform([]);

    expect(actualOutput).toBe('None');
  });
});
