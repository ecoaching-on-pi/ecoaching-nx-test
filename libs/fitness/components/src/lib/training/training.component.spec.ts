import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingComponent } from './training.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FitnessDataModule } from '@ecoaching-on-pi/fitness/data';
import { SharedUiModule } from '@ecoaching-on-pi/shared/ui';
import { SharedUtilityModule } from '@ecoaching-on-pi/shared/utility';
import { FitnessMaterialModule } from '../fitness-material.module';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TrainingComponent', () => {
  let component: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TrainingComponent,
        NewTrainingComponent,
        CurrentTrainingComponent,
        PastTrainingsComponent,
      ],
      imports: [
        SharedUiModule,
        SharedUtilityModule,
        FormsModule,
        ReactiveFormsModule,
        FitnessMaterialModule,
        FitnessDataModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
