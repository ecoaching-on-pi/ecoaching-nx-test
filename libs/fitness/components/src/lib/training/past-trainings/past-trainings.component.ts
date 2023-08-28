import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Exercise, TrainingService } from '@ecoaching-on-pi/fitness/data';

@Component({
  selector: 'ecoaching-on-pi-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss'],
})
export class PastTrainingsComponent implements OnInit {
  dataSource2 = [
    { name: 'Squat', duration: 300, calories: 8 },
    { name: 'Benchpress', duration: 220, calories: 5 },
  ];
  dataSource: MatTableDataSource<Exercise> = new MatTableDataSource();
  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.dataSource = this.trainingService.getCompletedOrCancelledExercises();
  }
}
