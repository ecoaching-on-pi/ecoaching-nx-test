import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '@ecoaching-on-pi/fitness/data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ecoaching-on-pi-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  selectedMinutes = 1;

  exerciseSubscription: Subscription = new Subscription();
  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      exercise => {
        if (exercise) {
          this.ongoingTraining = true;

        } else {
          this.ongoingTraining = false;

        }
      }
    );
  }

  // onTrainingStart(): void {
  //   this.ongoingTraining = true;
  // }

  onSelectedMinutesChange(minutes: number): void {
    this.selectedMinutes = minutes;
  }
  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }
}
