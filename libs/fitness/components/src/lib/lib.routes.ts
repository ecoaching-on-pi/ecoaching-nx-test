import { Route } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingsComponent } from './training/past-trainings/past-trainings.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from '@ecoaching-on-pi/fitness/data';
import { inject } from '@angular/core';

export const fitnessComponentsRoutes: Route[] = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
   { path: 'training', component: TrainingComponent, canActivate: [() => inject(AuthGuard).canActivate()],  },
  // { path: 'training', component: TrainingComponent },
  {
    path: 'current-training',
    component: CurrentTrainingComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
  {
    path: 'new-training',
    component: NewTrainingComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
  {
    path: 'past-training',
    component: PastTrainingsComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
];
