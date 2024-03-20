import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { FitnessComponentsRoutingModule } from './fitness-components-routing.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingsComponent } from './training/past-trainings/past-trainings.component';
import { FitnessMaterialModule } from './fitness-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { StopTrainingComponent } from './training/current-training/stop-training.component';
import { FitnessDataModule } from '@ecoaching-on-pi/fitness/data';
import { DynamicSliderComponent, SharedUiModule } from '@ecoaching-on-pi/shared/ui';
import { SharedUtilityModule } from '@ecoaching-on-pi/shared/utility';


@NgModule({
  imports: [
    CommonModule,
    SharedUiModule,
    SharedUtilityModule,
    FormsModule,
    ReactiveFormsModule,
    FitnessComponentsRoutingModule,
    FitnessMaterialModule,
    FitnessDataModule,
    DynamicSliderComponent
  ],
  declarations: [
    ProductsComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    StopTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    WelcomeComponent,
  ],
})
export class FitnessComponentsModule {}
