import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavComponent } from './sidenav.component';
import { AuthService } from '@ecoaching-on-pi/fitness/data';
import { Subscription, Subject } from 'rxjs';
import { UiMaterialModule } from '../ui-material.module';

describe('SidenavComponent', () => {
  let fixture: ComponentFixture<SidenavComponent>;
  let component: SidenavComponent;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavComponent],
      imports: [UiMaterialModule],
      providers: [AuthService], // Provide AuthService as a mock or actual service
    });

    fixture = TestBed.createComponent(SidenavComponent);
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

  it('should emit closesidenav event when onSidenavclose is called', () => {
    const emitMock = jest.fn();
    component.closesidenav.emit = emitMock;

    component.onSidenavclose();

    expect(emitMock).toHaveBeenCalled();
  });

  it('should call onSidenavclose and authService.logout() when onLogout is called', () => {
    const onSidenavCloseMock = jest.fn();
    component.onSidenavclose = onSidenavCloseMock;

    const logoutMock = jest.fn();
    authService.logout = logoutMock;

    component.onLogout();

    expect(onSidenavCloseMock).toHaveBeenCalled();
    expect(logoutMock).toHaveBeenCalled();
  });

  it('should unsubscribe from authSubscription on ngOnDestroy', () => {
    const authSubscriptionMock = new Subscription();
    component.authSubscription = authSubscriptionMock;

    const unsubscribeMock = jest.fn();
    authSubscriptionMock.unsubscribe = unsubscribeMock;

    component.ngOnDestroy();

    expect(unsubscribeMock).toHaveBeenCalled();
  });
});
