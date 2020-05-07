import { UnixEpochPipe } from './unix-epoch.pipe';

describe('Unix Epoch Pipe', () => {
  let pipe: UnixEpochPipe;

  beforeEach(() => {
    pipe = new UnixEpochPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert unix epoch in seconds to milliseconds', () => {
    const myEpoch = 1024;
    const myEpochMsec = myEpoch * 1000;

    const actual = pipe.transform(myEpoch);

    expect(actual.valueOf()).toBe(myEpochMsec);
  });
});
