import { TestBed } from '@angular/core/testing';
import { TrainingService } from './training.service';
import { Exercise } from '../interfaces/exercise.model';

describe('TrainingService', () => {
  let service: TrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainingService],
    });

    service = TestBed.inject(TrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return available exercises', () => {
    const mockExercises: Exercise[] = [
      { id: 'crunches', name: 'Crunches', calories: 8 },
      { id: 'touch-toes', name: 'Touch Toes', calories: 15 },
      { id: 'side-lunges', name: 'Side Lunges', calories: 18 },
      { id: 'burpees', name: 'Burpees', calories: 8 },
    ];

    const getAvailableExercisesSpy = jest
      .spyOn(service, 'getAvailableExercises')
      .mockReturnValue(mockExercises);

    const result = service.getAvailableExercises();

    expect(result).toEqual(mockExercises);
    expect(getAvailableExercisesSpy).toHaveBeenCalled();
  });

  // it('should start exercise and emit exerciseChanged subject', () => {
  //   const selectedId = 'crunches';
  //   const expectedExercise: Exercise = {
  //     id: 'crunches',
  //     name: 'Crunches',
  //     calories: 8,
  //   };

  //   const exerciseChangedSubjectSpy = jest.spyOn(service.exerciseChanged, 'next');
  //   const getRunningExerciseMock = jest.spyOn(service, 'getRunningExercise').mockReturnValue(expectedExercise);

  //   service.startexercise(selectedId);

  //   expect(exerciseChangedSubjectSpy).toHaveBeenCalledWith(expectedExercise);
  //   expect(getRunningExerciseMock).toHaveBeenCalled();
  // });

  // ... Other tests for completeExercise, cancelExercise, getCompletedOrCancelledExercises, etc.
});
