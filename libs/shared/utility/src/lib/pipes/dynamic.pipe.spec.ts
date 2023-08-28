import { DynamicPipe } from './dynamic.pipe';
import { SecondsToMinutesPipe } from './seconds-to-minutes.pipe';

describe('DynamicPipePipe', () => {
  it('create an instance', () => {
    const pipe = new DynamicPipe();
    expect(pipe).toBeTruthy();
  });

  describe('DynamicPipe', () => {
    let dynamicPipe: DynamicPipe;

    beforeEach(() => {
      dynamicPipe = new DynamicPipe();
    });

    it('transforms using SecondsToMinutesPipe for "duration"', () => {
      const value = 150; // Value in seconds
      const pipeName = 'duration';

      // Create a mock SecondsToMinutesPipe
      const mockSecondsToMinutesPipe = {
        transform: jest.fn(),
      };

      // Replace the actual pipe with the mock pipe in the pipes map
      dynamicPipe['pipes']['duration'] =
        mockSecondsToMinutesPipe as SecondsToMinutesPipe;

      dynamicPipe.transform(value, pipeName);

      expect(mockSecondsToMinutesPipe.transform).toHaveBeenCalledWith(value);
    });

    it('returns the original value for unknown pipe', () => {
      const value = 'original value';
      const pipeName = 'unknownPipe';

      const result = dynamicPipe.transform(value, pipeName);

      expect(result).toEqual(value);
    });
  });
});
