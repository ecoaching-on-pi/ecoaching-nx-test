import { inject } from '@angular/core';
import { Route } from '@angular/router';
import { AuthGuard } from '@ecoaching-on-pi/fitness/data';
// import { NxWelcomeComponent } from './nx-welcome.component';

export const appRoutes: Route[] = [
  // { path: '', component: NxWelcomeComponent},
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'fitness',
    loadChildren: () =>
      import('@ecoaching-on-pi/fitness/components').then(
        m => m.FitnessComponentsModule
      ), canLoad: [() => inject(AuthGuard).canLoad()], // use AuthGuard here as a functional guard
  },
];
