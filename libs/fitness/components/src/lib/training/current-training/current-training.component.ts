import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '@ecoaching-on-pi/fitness/data';

@Component({
  selector: 'ecoaching-on-pi-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  @Input() totalMinutes = 1;

  minutes = 0;
  seconds = 0;
  secondsDone = 0;
  remainingSeconds = 0;
  trainingName = '';
  constructor(
    private matDialog: MatDialog,
    private trainingService: TrainingService
  ) {
    this.trainingName = this.trainingService.getRunningExercise()
      ?.name as string;
  }

  ngOnInit(): void {
    this.startTimer(this.totalMinutes, this.secondsDone);
  }

  startTimer(minutesToDo: number, secondsDone: number): void {
    this.remainingSeconds = minutesToDo * 60;
    this.secondsDone = secondsDone;

    const timerInterval = setInterval(() => {
      this.minutes = Math.floor(this.remainingSeconds / 60);
      this.seconds = this.remainingSeconds % 60;

      if (this.remainingSeconds <= 0) {
        clearInterval(timerInterval);
        console.log('Timer completed!');
        this.trainingService.completeExercise(this.secondsDone);
      }
      this.secondsDone++;
      this.remainingSeconds--;
    }, 1000);
  }

  resumeTraining(minutesToDo: number, secondsDone: number): void {
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
      .subscribe(result =>
        result
          ? this.trainingService.cancelExercise(progress)
          : this.resumeTraining(remainingMinutes, progress)
      );
  }
}
