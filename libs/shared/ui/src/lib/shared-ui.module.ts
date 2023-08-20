import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UiMaterialModule } from './ui-material.module';
import { SharedServiceModule } from '@ecoaching-on-pi/shared/service';
import { BaseComponent } from './base/base.component';

@NgModule({
  imports: [CommonModule, RouterModule, UiMaterialModule, SharedServiceModule],
  declarations: [HeaderComponent, SidenavComponent, BaseComponent],
  exports: [HeaderComponent, SidenavComponent],
})
export class SharedUiModule {}
