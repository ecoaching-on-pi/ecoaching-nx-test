import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

import { Subscription, Subject } from 'rxjs';
import { AuthService } from '@ecoaching-on-pi/fitness/data';
import { UiMaterialModule } from '../ui-material.module';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [UiMaterialModule],
      providers: [AuthService], // Provide AuthService as a mock or actual service
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService); // Get instance of the AuthService
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isAuth to true when AuthService emits true', () => {
    const authStatus$ = new Subject<boolean>();
    authService.authChange = authStatus$;

    fixture.detectChanges();
    authStatus$.next(true);

    expect(component.isAuth).toBe(true);
  });

  it('should call authService.logout() when onLogout is called', () => {
    authService.logout = jest.fn();

    component.onLogout();

    expect(authService.logout).toHaveBeenCalled();
  });

  it('should emit sidenavToggle event when onSidenavToggle is called', () => {
    const emitMock = jest.fn();
    component.sidenavToggle.emit = emitMock;

    component.onSidenavToggle();

    expect(emitMock).toHaveBeenCalled();
  });

  it('should unsubscribe from authSubscription on ngOnDestroy', () => {
    const authSubscriptionMock = new Subscription();
    component.authSubscription = authSubscriptionMock;

    authSubscriptionMock.unsubscribe = jest.fn();

    component.ngOnDestroy();

    expect(authSubscriptionMock.unsubscribe).toHaveBeenCalled();
  });
});
