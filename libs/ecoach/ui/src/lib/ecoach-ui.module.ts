import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ecoachUiRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ecoachUiRoutes)],
})
export class EcoachUiModule {}
