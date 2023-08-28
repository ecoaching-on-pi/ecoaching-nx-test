import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewTrainingComponent } from './new-training.component';
import {
  TrainingService,
  Exercise,
  FitnessDataModule,
} from '@ecoaching-on-pi/fitness/data';
import { FitnessMaterialModule } from '../../fitness-material.module';
import { SharedUiModule } from '@ecoaching-on-pi/shared/ui';
import { SharedUtilityModule } from '@ecoaching-on-pi/shared/utility';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NewTrainingComponent', () => {
  let component: NewTrainingComponent;
  let fixture: ComponentFixture<NewTrainingComponent>;
  let mockTrainingService: Partial<TrainingService>;

  beforeEach(async () => {
    mockTrainingService = {
      getAvailableExercises: jest.fn().mockReturnValue([]),
      startexercise: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [NewTrainingComponent],
      imports: [
        SharedUiModule,
        SharedUtilityModule,
        FormsModule,
        ReactiveFormsModule,
        FitnessMaterialModule,
        FitnessDataModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: TrainingService, useValue: mockTrainingService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize exercises and currentImage', () => {
    const expectedExercises: Exercise[] = [
      { id: 'exercise1', name: 'Exercise 1', calories: 100 },
      // ... other exercises
    ];
    mockTrainingService.getAvailableExercises = jest
      .fn()
      .mockReturnValue(expectedExercises);

    component.ngOnInit();

    expect(component.exercises).toEqual(expectedExercises);

    // You can also test the currentImage logic here if needed
  });

  it('should start training and emit selectedMinutesChange', () => {
    const selectedMinutes = 15;
    const favoriteSport = 'exercise1';
    const selectedMinutesChangeSpy = jest.spyOn(
      component.selectedMinutesChange,
      'emit'
    );

    component.newTrainingForm.setValue({ favoriteSport, selectedMinutes });
    component.onStartTraining();

    expect(mockTrainingService.startexercise).toHaveBeenCalledWith(
      favoriteSport
    );
    expect(selectedMinutesChangeSpy).toHaveBeenCalledWith(selectedMinutes);
  });
});
