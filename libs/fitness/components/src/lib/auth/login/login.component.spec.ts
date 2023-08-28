import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule or ReactiveFormsModule
import { FitnessMaterialModule } from '../../fitness-material.module';
import { FitnessDataModule } from '@ecoaching-on-pi/fitness/data';
import { SharedUiModule } from '@ecoaching-on-pi/shared/ui';
import { SharedUtilityModule } from '@ecoaching-on-pi/shared/utility';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
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

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
