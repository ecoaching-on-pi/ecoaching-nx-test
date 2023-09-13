/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


interface PropertyPipes {
  name: string;
  pipename: string;
}

@Component({
  selector: 'ecoaching-on-pi-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})

export class DynamicTableComponent<T> implements AfterViewInit, OnChanges {
  private _data:  MatTableDataSource<T> = new MatTableDataSource<T>();
  private _propertyPipes: PropertyPipes[] = [];

  @Input() set data(data: T[]) {

  this._data.data = data;
    }
  get dataSource(): MatTableDataSource<T>{
      return this._data;
    }

  @Input() set propertyPipes(propertyPipes: PropertyPipes[]) {
     this._propertyPipes = propertyPipes;
  }; // Pipes to apply to specific properties
  get propertyPipes(): PropertyPipes[] {
    return this._propertyPipes;
  }

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [];
  pipeNames: string[] = [];


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this._data) { // Check if data is defined
      this.displayedColumns = this.getDisplayedColumns();
    }
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this._data.sort = this.sort;
    }
    if (this.paginator) {
      this._data.paginator = this.paginator;
    }
  }

  applyFilter(event: Event): void {
    const filterValue = event.target ? (event.target as HTMLInputElement).value : '';
    if (filterValue && this._data) {
      this._data.filter = filterValue.trim();
    }
  }

  private getDisplayedColumns(): string[] {
    // Collect all unique property names as columns
    const allProperties = this._data.data.flatMap((item: T) =>
      (Object.keys(item as object) as (keyof T)[]).map(String)
    );
    return Array.from(new Set(allProperties));
  }

}
