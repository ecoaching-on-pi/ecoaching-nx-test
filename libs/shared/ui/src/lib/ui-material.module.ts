import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  imports: [MatIconModule, MatToolbarModule, MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSliderModule],
  exports: [MatIconModule, MatToolbarModule, MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSliderModule],
})
export class UiMaterialModule {}
