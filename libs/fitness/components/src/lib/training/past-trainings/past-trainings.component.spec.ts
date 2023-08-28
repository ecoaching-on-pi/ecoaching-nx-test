import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PastTrainingsComponent } from './past-trainings.component';
import { SharedUiModule } from '@ecoaching-on-pi/shared/ui';
import { SharedUtilityModule } from '@ecoaching-on-pi/shared/utility';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FitnessDataModule } from '@ecoaching-on-pi/fitness/data';
import { FitnessMaterialModule } from '../../fitness-material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PastTrainingsComponent', () => {
  let component: PastTrainingsComponent;
  let fixture: ComponentFixture<PastTrainingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PastTrainingsComponent],
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

    fixture = TestBed.createComponent(PastTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
