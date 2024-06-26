import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicSliderComponent } from './dynamic-slider.component';

describe('DynamicSliderComponent', () => {
  let component: DynamicSliderComponent;
  let fixture: ComponentFixture<DynamicSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DynamicSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
