import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '@ecoaching-on-pi/fitness/data';

@Component({
  selector: 'ecoaching-on-pi-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  @Input() totalMinutes = 1;

  minutes = 0;
  seconds = 0;
  secondsDone = 0;
  remainingSeconds = 0;
  trainingName = '';
  timerId?: number;
  constructor(
    private matDialog: MatDialog,
    private trainingService: TrainingService
  ) {

  }

  ngOnInit(): void {
    this.trainingName = this.trainingService.getRunningExercise()
    ?.name as string;
    this.startTimer(this.totalMinutes, this.secondsDone);
  }

  startTimer(minutesToDo: number, secondsDone: number): void {
    this.remainingSeconds = minutesToDo * 60;
    this.secondsDone = secondsDone;

    // Clear existing timer if there's one running
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    this.timerId = setInterval(() => {
      this.minutes = Math.floor(this.remainingSeconds / 60);
      this.seconds = this.remainingSeconds % 60;
      console.log('startTimer', this.remainingSeconds);

      if (this.remainingSeconds <= 0) {
        clearInterval(this.timerId);
        console.log('Timer completed!');
        this.trainingService.completeExercise(this.secondsDone, this.trainingName);
      }
      this.secondsDone++;
      this.remainingSeconds--;
    }, 1000);
  }

  resumeTraining(minutesToDo: number, secondsDone: number): void {
    console.log('resumeTraining', minutesToDo, secondsDone);
    this.startTimer(minutesToDo, secondsDone);
  }

  onStopTraining(minutesToDo: number, secondsDone: number): void {
    const remainingMinutes = minutesToDo / 60;

    const progress = secondsDone;

    console.log('onStopTraining', this.totalMinutes);
    const dialogRef = this.matDialog.open(StopTrainingComponent, {
      data: { minutes: this.minutes, seconds: this.seconds },
    });
    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result) {
          // Clear the timer when canceling
          if (this.timerId) {
              clearInterval(this.timerId);
          }
          this.trainingService.cancelExercise(progress, this.trainingName);
      } else {
          this.resumeTraining(remainingMinutes, progress);
        }
       }
      );
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      console.log('ngOnDestroy_TimerId', this.timerId);
      clearInterval(this.timerId);
    }
  }
}
