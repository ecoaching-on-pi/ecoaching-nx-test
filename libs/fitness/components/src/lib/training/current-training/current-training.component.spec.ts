import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentTrainingComponent } from './current-training.component';
import { FitnessMaterialModule } from '../../fitness-material.module';
import { SharedUtilityModule } from '@ecoaching-on-pi/shared/utility';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FitnessDataModule } from '@ecoaching-on-pi/fitness/data';
import { SharedUiModule } from '@ecoaching-on-pi/shared/ui';

describe('CurrentTrainingComponent', () => {
  let component: CurrentTrainingComponent;
  let fixture: ComponentFixture<CurrentTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentTrainingComponent],
      imports: [
        SharedUiModule,
        SharedUtilityModule,
        FormsModule,
        ReactiveFormsModule,
        FitnessMaterialModule,
        FitnessDataModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
