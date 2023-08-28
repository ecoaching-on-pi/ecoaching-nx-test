import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BaseComponent } from './base.component';
import { BreakpointsService } from '@ecoaching-on-pi/shared/service';
import { Subscription } from 'rxjs';

describe('BaseComponent', () => {
  let fixture: ComponentFixture<BaseComponent>;
  let component: BaseComponent;
  // let breakpointsService: BreakpointsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BaseComponent],
      providers: [BreakpointsService], // Provide BreakpointsService as a mock or actual service
    }).compileComponents();

    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    // breakpointsService = TestBed.inject(BreakpointsService); // Get instance of the BreakpointsService
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should set isSmallScreen to true when BreakpointsService emits true', async () => {
  //   const breakpointChanges$ = new Subject<boolean>();
  //   breakpointsService.breakpointChanges$ = breakpointChanges$;

  //   fixture.detectChanges();

  //   await fixture.whenStable(); // Wait for asynchronous operations

  //   breakpointChanges$.next(true);

  //   // expect(component.isSmallScreen).toBe(true);
  //   setTimeout(() => {
  //     expect(component.isSmallScreen).toBe(true);
  //   }, 0);
  // });

  it('should unsubscribe from breakpointSubscription on ngOnDestroy', () => {
    const breakpointSubscriptionMock: Subscription = new Subscription();
    component.breakpointSubscription = breakpointSubscriptionMock;

    const unsubscribeMock = jest.fn();
    breakpointSubscriptionMock.unsubscribe = unsubscribeMock;

    component.ngOnDestroy();

    expect(unsubscribeMock).toHaveBeenCalled();
  });
});
