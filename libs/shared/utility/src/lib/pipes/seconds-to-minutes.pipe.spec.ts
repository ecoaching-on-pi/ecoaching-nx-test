import { SecondsToMinutesPipe } from './seconds-to-minutes.pipe';

describe('SecondsToMinutesPipe', () => {
  it('create an instance', () => {
    const pipe = new SecondsToMinutesPipe();
    expect(pipe).toBeTruthy();
  });

  describe('SecondsToMinutesPipe', () => {
    let pipe: SecondsToMinutesPipe;

    beforeEach(() => {
      pipe = new SecondsToMinutesPipe();
    });

    it('transforms seconds to minutes and seconds', () => {
      expect(pipe.transform(90)).toBe('1m 30s');
      expect(pipe.transform(180)).toBe('3m 0s');
      expect(pipe.transform(45)).toBe('0m 45s');
    });
  });
});
