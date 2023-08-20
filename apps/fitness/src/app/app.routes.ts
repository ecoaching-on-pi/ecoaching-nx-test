import { Route } from '@angular/router';
// import { NxWelcomeComponent } from './nx-welcome.component';

export const appRoutes: Route[] = [
  // { path: '', component: NxWelcomeComponent},
  { path: '', redirectTo: 'fitness', pathMatch: 'full' },
  {
    path: 'fitness',
    loadChildren: () =>
      import('@ecoaching-on-pi/fitness/components').then(
        m => m.FitnessComponentsModule
      ),
  },
];
