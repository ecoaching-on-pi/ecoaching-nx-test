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
import { LogAllMethodOutputs } from '@ecoaching-on-pi/shared/utility';

interface PropertyPipes {
  name: string;
  pipename: string;
}

@Component({
  selector: 'ecoaching-on-pi-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})

@LogAllMethodOutputs
export class DynamicTableComponent<T> implements OnChanges, AfterViewInit {
  @Input() data: MatTableDataSource<T> = new MatTableDataSource<T>(); // Input data with varying properties
  @Input() propertyPipes: PropertyPipes[] = []; // Pipes to apply to specific properties

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<T> = this.data;
  displayedColumns: string[] = [];
  pipeNames: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) { // Check if data is defined
      this.displayedColumns = this.getDisplayedColumns();
    }
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  isDate(value: Date): boolean {
    return value instanceof Date && !isNaN(value.getTime());
  }


  applyFilter(event: Event): void {
    const filterValue = event.target ? (event.target as HTMLInputElement).value : '';
    if (filterValue && this.dataSource) {
      this.dataSource.filter = filterValue.trim();
    }
  }


  private getDisplayedColumns(): string[] {
    // Collect all unique property names as columns
    const allProperties = this.dataSource.data.flatMap((item: T) =>
      (Object.keys(item as object) as (keyof T)[]).map(String)
    );
    return Array.from(new Set(allProperties));
  }
}
