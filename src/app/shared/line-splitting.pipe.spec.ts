import { AlbumDescriptionPipe } from './album-description.pipe';

describe('LineSplittingPipe', () => {
  it('create an instance', () => {
    const pipe = new LineSplittingPipe();
    expect(pipe).toBeTruthy();
  });

  it('Splits lines with new line characters into an array', () => {
    const input = 'I like\nnew lines\nthere should be three';
    const pipe = new LineSplittingPipe();
    const output = pipe.transform(input, null);

    expect(output.length).toBe(3);
    expect(output[0]).toBe('I like');
    expect(output[1]).toBe('new lines');
    expect(output[2]).toBe('there should be three');
  });
});
