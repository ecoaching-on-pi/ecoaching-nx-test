import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { fitnessComponentsRoutes } from './lib.routes';

@NgModule({
  imports: [RouterModule.forChild(fitnessComponentsRoutes)],
  exports: [RouterModule],
})
export class FitnessComponentsRoutingModule {}
