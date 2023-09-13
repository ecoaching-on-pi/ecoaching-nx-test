/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import {  TrainingService } from '@ecoaching-on-pi/fitness/data';
import {  Observable} from 'rxjs';

@Component({
  selector: 'ecoaching-on-pi-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss'],
})
export class PastTrainingsComponent implements AfterViewInit {
  dataSource2 = [
    { name: 'Squat', duration: 300, calories: 8 },
    { name: 'Benchpress', duration: 220, calories: 5 },
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  finishedExercises$: Observable<any> = new Observable();
  constructor(private trainingService: TrainingService) {}

  ngAfterViewInit(): void {
   this.finishedExercises$ = this.trainingService.getCompletedOrCancelledExercises()
  }


}
