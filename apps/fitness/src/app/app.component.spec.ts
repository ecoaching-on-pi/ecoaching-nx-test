import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { RouterTestingModule } from '@angular/router/testing';
import {
  HeaderComponent,
  SharedUiModule,
  SidenavComponent,
} from '@ecoaching-on-pi/shared/ui';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FitnessComponentsModule } from '@ecoaching-on-pi/fitness/components';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';

let fixture: ComponentFixture<AppComponent>;
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FitnessComponentsModule,
        SharedUiModule,
        BrowserAnimationsModule,
        MaterialModule,
        NoopAnimationsModule
      ],
      declarations: [
        AppComponent,
        MatSidenavContainer,
        MatSidenav,
        MatSidenavContent,
        SidenavComponent,
        HeaderComponent,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should include the required components in the template', () => {
    const appHtml = fixture.nativeElement;
    const sidenavContainer = appHtml.querySelector('mat-sidenav-container');
    const sidenav = appHtml.querySelector('mat-sidenav');
    const sidenavContent = appHtml.querySelector('mat-sidenav-content');
    const ecoachingOnPiSidenav = appHtml.querySelector(
      'ecoaching-on-pi-sidenav'
    );
    const ecoachingOnPiHeader = appHtml.querySelector('ecoaching-on-pi-header');
    const routerOutlet = appHtml.querySelector('router-outlet');

    expect(sidenavContainer).toBeTruthy();
    expect(sidenav).toBeTruthy();
    expect(sidenavContent).toBeTruthy();
    expect(ecoachingOnPiSidenav).toBeTruthy();
    expect(ecoachingOnPiHeader).toBeTruthy();
    expect(routerOutlet).toBeTruthy();
  });
});
