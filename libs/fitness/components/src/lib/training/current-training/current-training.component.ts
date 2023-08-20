import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'ecoaching-on-pi-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter<void>();

  @Input() totalMinutes = 1;

  minutes = 0;
  seconds = 0;
  remainingSeconds = 0;
  remainingTime = 0;
  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {
    console.log('totalMinutes', this.totalMinutes);
    this.startTimer();
  }

  startTimer(): void {
    this.remainingSeconds = this.totalMinutes * 60;

    const timerInterval = setInterval(() => {
      this.minutes = Math.floor(this.remainingSeconds / 60);
      this.seconds = this.remainingSeconds % 60;

      if (this.remainingSeconds <= 0) {
        clearInterval(timerInterval);
        console.log('Timer completed!');
        this.trainingExit.emit();
      }

      this.remainingSeconds--;
    }, 1000);
  }

  resumeTraining(): void {
    this.startTimer();
  }

  onStopTraining(): void {
    this.totalMinutes = this.minutes + this.seconds / 60;
    console.log('onStopTraining', this.totalMinutes);
    const dialogRef = this.matDialog.open(StopTrainingComponent,{data:{ minutes: this.minutes, seconds: this.seconds }});
    dialogRef.afterClosed().subscribe((result) => result ? this.trainingExit.emit() : this.resumeTraining());

  }
}
