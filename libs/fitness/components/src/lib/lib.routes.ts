import { Route } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingsComponent } from './training/past-trainings/past-trainings.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const fitnessComponentsRoutes: Route[] = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: SignupComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'current-training', component: CurrentTrainingComponent },
  { path: 'new-training', component: NewTrainingComponent },
  { path: 'past-training', component: PastTrainingsComponent },
];
