import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UiMaterialModule } from './ui-material.module';
import { SharedServiceModule } from '@ecoaching-on-pi/shared/service';
import { BaseComponent } from './base/base.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { SharedUtilityModule } from '@ecoaching-on-pi/shared/utility';
import { DynamicTemplateComponent } from './dynamic-template/dynamic-template.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UiMaterialModule,
    SharedServiceModule,
    SharedUtilityModule,
  ],
  declarations: [
    HeaderComponent,
    SidenavComponent,
    BaseComponent,
    DynamicTableComponent,
    DynamicTemplateComponent,
  DynamicTemplateComponent,],
  exports: [HeaderComponent, SidenavComponent, DynamicTableComponent, DynamicTemplateComponent],
})
export class SharedUiModule {}
