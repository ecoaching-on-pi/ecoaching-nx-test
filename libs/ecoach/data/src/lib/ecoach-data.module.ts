import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ecoachDataRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ecoachDataRoutes)],
})
export class EcoachDataModule {}
