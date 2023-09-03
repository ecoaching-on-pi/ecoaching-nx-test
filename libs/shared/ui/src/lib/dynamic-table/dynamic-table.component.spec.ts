/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicTableComponent } from './dynamic-table.component';
import { ChangeDetectorRef} from '@angular/core';

import { SharedServiceModule } from '@ecoaching-on-pi/shared/service';
import { SharedUtilityModule } from '@ecoaching-on-pi/shared/utility';
import { UiMaterialModule } from '../ui-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('DynamicTableComponent', () => {
  let component: DynamicTableComponent<any>;
  let fixture: ComponentFixture<DynamicTableComponent<any>>;
  let changeDetectorRef: ChangeDetectorRef;
  let matPaginator: MatPaginator;
  let matSort: MatSort;

  beforeEach(async () => {


    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule,
        UiMaterialModule,
        SharedServiceModule,
        SharedUtilityModule,
        NoopAnimationsModule
      ],
      declarations: [HeaderComponent, SidenavComponent, DynamicTableComponent],
      providers: [
        {
          provide: MatPaginator,
          useValue: matPaginator,
        },
        {
          provide: MatSort,
          useValue: matSort,
        },
        {
          provide: MatPaginatorIntl,
          useValue: new MatPaginatorIntl(),
        },
        {
          provide: ChangeDetectorRef,
          useValue: {
            detectChanges: jest.fn(),
          },
        },
      ],
    }).compileComponents();
    changeDetectorRef = TestBed.inject(ChangeDetectorRef);
    matPaginator = new MatPaginator(new MatPaginatorIntl(), changeDetectorRef);
    matSort = new MatSort();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTableComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no data initially', () => {
    expect(component.dataSource.data.length).toBe(0);
  });

  it('should set data when @Input data is set', () => {
    const data = new MatTableDataSource([{ col1: 'data1', col2: 'data2' }]);
    component.data = data;
    expect(component.dataSource.data.length).toBe(1);
  });

  it('should get displayedColumns in ngOnChanges', () => {
    const mockData = new MatTableDataSource([
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ]);
    component.data = mockData;


    const changes: { [key: string]: any } = {
      data: {
        currentValue: mockData,
        previousValue: undefined,
        firstChange: true,
      },
    };

    component.ngOnChanges(changes);

    expect(component.displayedColumns).toEqual(['name', 'age']);
  });

  it('should set sort and paginator in ngAfterViewInit', () => {
    const matPaginator = new MatPaginator(new MatPaginatorIntl(), changeDetectorRef);
    const matSort = new MatSort();

    component.sort = matSort;
    component.paginator = matPaginator;

    component.ngAfterViewInit();

    expect(component.dataSource.sort).toBe(matSort);
    expect(component.dataSource.paginator).toBe(matPaginator);
  });

  it('should check if a value is a valid Date', () => {
    const validDate = new Date();
    const invalidDate = new Date('invalid date');
    const notDate = 'string';

    expect(component.isDate(validDate)).toBe(true);
    expect(component.isDate(invalidDate)).toBe(false);
    expect(component.isDate(notDate as any)).toBe(false);
  });

  it('should apply filter to dataSource', () => {
    const mockData = new MatTableDataSource([
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ]);
    component.data = mockData;
    const filterValue = 'John';

    const event: Event = { target: { value: filterValue } } as unknown as Event;
    component.applyFilter(event);

    expect(component.dataSource.filter).toBe('John');
  });


  it('should not apply filter to dataSource if event.target.value is null', () => {
    const mockData = new MatTableDataSource([
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ]);
    component.data = mockData;

    const event: Event = { target: { value: null } } as unknown as Event;
    component.applyFilter(event);

    expect(component.dataSource.filter).toBe('');
  });

  it('should return empty array in getDisplayedColumns if dataSource.data is empty', () => {
    const mockData = new MatTableDataSource<any>([]);
    component.data = mockData;

    const displayedColumns = component['getDisplayedColumns']();

    expect(displayedColumns).toEqual([]);
  });


  it('should return all unique property names in getDisplayedColumns', () => {
    const mockData = new MatTableDataSource([
      { name: 'John', age: 30 },
      { name: 'Jane', gender: 'female' },
    ]);
    component.data = mockData;

    const displayedColumns = component['getDisplayedColumns']();

    expect(displayedColumns).toEqual(['name', 'age', 'gender']);
  });
});
