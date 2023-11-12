import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ecoachComponentsRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ecoachComponentsRoutes)],
})
export class EcoachComponentsModule {}
